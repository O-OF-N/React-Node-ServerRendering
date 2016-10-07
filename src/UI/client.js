import React from 'react';
import { render } from 'react-dom';
import DiabeticsChart from './components/diabetics-chart';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import ObservationObject from './reducer/glucose-results-reducer';
import {fetchObservations} from './components/glucose-results/glucose-results-action';
import {Provider} from 'react-redux';
const logger = createLogger();
const reducer = combineReducers({ ObservationObject });
const middleware = applyMiddleware(thunk, logger);

const preloadedState = window.__PRELOADED_STATE__;
console.log('preloadedState = ' + preloadedState);
const state = () => preloadedState;
const store = createStore(reducer, middleware, state);

const dom = () => {
    render(
        <Provider store = {store}>
            <DiabeticsChart/>
        </Provider>, document.getElementById('app')
    );
};

dom();
store.subscribe(dom);

store.dispatch(fetchObservations());