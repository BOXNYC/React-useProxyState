import { useState, useEffect, useRef } from 'react';
export default function useProxyState(ob, onEffect) {
    const obRef = useRef(ob);
    const proxy = new Proxy(obRef.current, {
        get(target, name) {
            return target[name];
        },
        set(target, name, receiver) {
            target[name] = receiver;
            setSetterState((c) => {
                if ( Array.isArray(c) ) return [...target];
                return { ...target };
            });
            return true;
        },
        has: function (target, name) {
            return Reflect.has(target, name);
        }
    });
    const [setterState, setSetterState] = useState(proxy);
    useEffect(() => {
        if ( typeof onEffect === 'function')
            onEffect(setterState, setSetterState);
    }, [setterState, onEffect]);
    return proxy;
}