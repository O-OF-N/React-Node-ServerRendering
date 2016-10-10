import React from 'react';
import drawChart from './chart/draw-chart';
import {connect} from 'react-redux';

const style = { border: '1px solid', width: 300, height: 300 };
const logit = (glucose, canvas) => {
    if (canvas && glucose) {
        const labels = glucose.map(g => g.date).toJS();
        const data = glucose.map(g => g.quantity).toJS();
        const ctx = canvas.getContext("2d");
        canvas.width = 100;
        canvas.height = 100;
        canvas.style.width = '100px';
        canvas.style.height = '100px';
        drawChart(ctx, labels, data);
    }
};
const GlucoseResults = ({glucose}) => {
    return (
        <div style={style}>
            <canvas ref="diabetesChart" width="200" height="200">
            </canvas>
            {this.logit(glucose, this.refs.diabetesChart) }
        </div>
    )
};

export default connect(state => ({
    glucose: state.GlucoseObject.glucose
}))(GlucoseResults);