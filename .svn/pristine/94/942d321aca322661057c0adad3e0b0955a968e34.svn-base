import React from 'react';
import { render } from 'react-dom';
import DiabeticsChart from './components/diabetics-chart';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import ObservationObject from './reducer/glucose-results-reducer';
import {fetchObservations} from './components/glucose-results/glucose-results-action';

const logger = createLogger();
const reducer = combineReducers({ ObservationObject});
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducer, middleware);

const dom = () => {
    render(
        <DiabeticsChart observations={store.getState().ObservationObject.observations}/>, document.getElementById('app')
    );
};

dom();
store.subscribe(dom);

store.dispatch(fetchObservations());