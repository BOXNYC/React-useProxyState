import { Alert, Button } from "react-bootstrap"
export default function Jumbotron({display}) { return (
    <div id="jumbotron" className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">React Hook useProxyState()</h1>
            <p className="col-md-8 fs-4"><code>useProxyState()</code> is a React Hook that works similarly to <code>useState()</code>, but uses a Proxy "setter" to change the state and trigger a rerender.</p>
            <div className={!display.jumbotronShowMore ? 'd-none' : ''}>
                <p><code>useProxyState()</code> is a wrapper with three dependency hooks: <code>useState()</code> <code>useRef()</code> and <code>useEffect()</code>.</p>
                <p>This hook returns a Proxy object of either an Object or an Array. And changes to these objects trigger the state change.</p>
                <h4>Documention</h4>
                <pre><code><b>useProxyState( object&lt;Object, Array&gt; <em>[, onEffect&lt;Function&gt;]</em>):&lt;Proxy&gt;</b><br />
                - object: An Object or an Array to be proxied.<br />
                - onEffect: (optional) A callbackfunction that is called when the useState triggers the useEffect.<br /><br />
                <b>Returns</b> Proxy Object to be used as a getter setter in your React Components.
                </code></pre>
                <h4>Example</h4>
                <pre><code>const user = useProxyState({"{ username: '' }"});<br />
                return &lt;input onChange={"{e=> user.name=e.target.value }"} value={"{ user.name }"}  type="text" /&gt;
                </code></pre>
                <h4>Caveat</h4>
                <p>Changing a proxy during a render call will cause an infinite loop.</p>
            </div>
            <Button onClick={e=>display.jumbotronShowMore=!display.jumbotronShowMore} variant="secondary" size="sm" className="w-100">
                {display.jumbotronShowMore ? 'Less' : 'More'}
            </Button>
            <hr></hr>
            <Alert>This site is a fake Toy Store e-commerce, and <code>useProxyState()</code> is the only hook used.</Alert>
        </div>
      </div>
)}