import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

import './css/normalize.css';
import './css/webflow.css';
import './css/lgr-react.webflow.css';
import './css/App.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
injectTapEventPlugin();
