import React from 'react';
import { render } from 'react-dom';
import DiabetieChart from './components/diabetes-chart';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import GlucoseObject from './reducer/glucose-results-reducer';
import {fetchGlucose} from './components/glucose-results/glucose-results-action';
import {Provider} from 'react-redux';
import * as Records from './records/records';

const logger = createLogger();

const State = new Records.ServerState({ state: window.__PRELOADED_STATE__ });
console.log('preloadedState = ' + State);
const reducer = combineReducers({ State, GlucoseObject });
const middleware = applyMiddleware(thunk, logger);


const store = createStore(reducer, middleware);

const dom = () => {
    render(
        <Provider store = {store}>
            <DiabetieChart/>
        </Provider>, document.getElementById('app')
    );
};

dom();
store.subscribe(dom);

store.dispatch(fetchGlucose(State.state));