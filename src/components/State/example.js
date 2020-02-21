import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Page from 'Common/Page/';
import CodeBlock from 'Common/CodeBlock';

import State from './index';

const App = () => {
  const [lookup, updateLookup] = useState('FL');



  return (
    <Page title='State' page='State'>
      <p style={{maxWidth: 'none'}}>
        Component for providing an SVG of a US state. Powered by the <a href="https://github.com/propublica/stateface/tree/master/eps/state-plane">.eps files</a> in <a href="https://propublica.github.io/stateface/">ProPublica's StateFace font</a> and the popular <a href="https://www.npmjs.com/package/us">us</a> library for lookup. Use the searchbox below to test props to the component.
      </p>
      <br /><br />
      <input onChange={e => updateLookup(e.target.value)} value={lookup}></input>
      <br /><br /><br />
      <State>{lookup}</State>


      <CodeBlock
        value={`import { State } from '@politico/module_react-stateface';

/* Use the "state" prop to provide a lookup string */
<State state={"${lookup}"} />

/* Or pass the lookup value as the component's child */
<State>{"${lookup}"}</State>
`}
      />
    </Page>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById('app'));
