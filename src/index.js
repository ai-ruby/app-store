import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import List from './container/list/list'

import reducers from './reducer'
import './config'
import 'antd-mobile/dist/antd-mobile.css'
import './index.css'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<Switch>
					<Route path="/" component={List} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
