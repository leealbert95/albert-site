import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reduxApp from './reducers';
import Layout from './components/Layout';
import registerServiceWorker from './registerServiceWorker';
import './stylesheets/index.css';

const store = createStore(reduxApp);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Route component={Layout}/>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
	);
registerServiceWorker();
