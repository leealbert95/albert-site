import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import Layout from './pages/Layout';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
	<BrowserRouter>
		<Layout />
	</BrowserRouter>,
	document.getElementById('root')
	);
registerServiceWorker();
