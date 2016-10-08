import React from 'react';
import { render } from 'react-dom';
import DiabetieChart from './components/diabetes-chart';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import GlucoseObject from './reducer/glucose-results-reducer';
import StateObject from './reducer/state-reducer';
import {fetchGlucose} from './components/glucose-results/glucose-results-action';
import {Provider} from 'react-redux';
import * as Records from './records/records';
import * as Constants from './utils/constants';

const logger = createLogger();

const State = new Records.ServerState({ state: window.__PRELOADED_STATE__ });
const reducer = combineReducers({ StateObject, GlucoseObject });
const middleware = applyMiddleware(thunk, logger);


const store = createStore(reducer, middleware);
const init = function* (){
    console.log('state = ' + window.__PRELOADED_STATE__)
    yield store.dispatch(Constants.SET_SERVER_STATE, window.__PRELOADED_STATE__);
    store.dispatch(fetchGlucose(State.state));
};

const dom = () => {
    render(
        <Provider store = {store}>
            <DiabetieChart/>
        </Provider>, document.getElementById('app')
    );
};
dom();
store.subscribe(dom);
init();
