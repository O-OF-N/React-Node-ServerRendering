import React from 'react';
import { render } from 'react-dom';
import DiabetiesChart from './components/diabetes-chart';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import glucoseObject from './reducer/glucose-results-reducer';
import labObject from './reducer/lab-results-reducer';
import medicationObject from './reducer/medication-results-reducer';
import stateObject from './reducer/state-reducer';
import slidingScale from './reducer/sliding-scale-reducer';
import { fetchGlucose } from './components/glucose-results/glucose-results-action';
import { fetchLabs } from './components/lab-results/lab-results-action';
import { fetchMedications } from './components/medications/medications-action';
import { Provider } from 'react-redux';
import * as Records from './records/records';
import * as Constants from './utils/constants';
import co from 'co';
import { inheritStyle } from './components/styles';
import '/terra/img/icon_sprite.png';

const logger = createLogger();

const State = new Records.ServerState({ state: window.__PRELOADED_STATE__ });
const reducer = combineReducers({ stateObject, glucoseObject, labObject, medicationObject, slidingScale });
const middleware = applyMiddleware(thunk, logger);


const store = createStore(reducer, middleware);
const init = function* (dispatch, state) {
    yield dispatch({ type: Constants.SET_SERVER_STATE, payLoad: state })
    dispatch(fetchGlucose(store.getState().stateObject));
    dispatch(fetchLabs(store.getState().stateObject));
    dispatch(fetchMedications(store.getState().stateObject));
};

const dom = () => {
    render(
        <Provider store={store}>
            <DiabetiesChart style={inheritStyle} />
        </Provider>, document.getElementById('app')
    );
};
dom();
store.subscribe(dom);
co(init.bind(null, store.dispatch, window.__PRELOADED_STATE__));
