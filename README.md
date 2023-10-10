# React-useProxyState

Experimental React hook which extends the "setter" method to an object or array state. useProxyState is esentially setState() using a Proxy instance as the state default. All property changes to the proxied state triggers a component render.

## Install via npm
```
npm install react-useproxystate
```

## Demo
The /toy-store directory is a vite+React project built with only the one hook: useProxyState(). Its a fake E-commerce Toy Store.
