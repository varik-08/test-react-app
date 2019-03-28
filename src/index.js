import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {Route, Router, browserHistory} from "react-router";
import {syncHistoryWithStore} from 'react-router-redux';

import App from './App';
import reducer from './reducers';
import About from './About';
import Track from './Track';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route exact path="/" component={App}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/tracks/:id" component={Track}/>
        </Router>
    </Provider>,
    document.getElementById('root'));

