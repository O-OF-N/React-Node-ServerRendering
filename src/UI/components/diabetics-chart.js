import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import {connect} from 'react-redux';

export default class DiabeticsChart extends React.Component {
    render() {
        return (
            <div>
                <h1> Diabetes Chart </h1>
                <GlucoseResults/>
            </div>
        );
    }
};

