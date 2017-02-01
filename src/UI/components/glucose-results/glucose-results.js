import React from 'react';
import drawChart from './chart/draw-chart';
import { connect } from 'react-redux';

class GlucoseResults extends React.Component {
    constructor(props) {
        super(props);
        this.logit = this.logit.bind(this);
    }
    generateChart(data) {
        console.log(data);

    }
    logit() {
        if (this.props.glucose) {
            const labels = ['x',...this.props.glucose.map(glucose => glucose.date ? new Date(glucose.date).toLocaleTimeString() : null).toJS().splice(0,9)];
            const data = ['Blood Glucose', ...this.props.glucose.map(glucose => glucose.quantity).toJS().splice(0,9)];
            const toolTip = this.props.glucose.map(glucose => { return { date: glucose.quantity, toolTip: glucose.source } })
            drawChart(labels, data, toolTip);
        }
    }
    render() {
        const style = {
            width: '48%', float: 'left', paddingLeft: '0.5%', maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'auto'
        };
        const data = this.props.glucose.map(glucose => glucose.quantity).toJS();
        this.logit();
        return (
            <div style={style}>
                <h3>Blood Glucose (all sources for past 24 hours)</h3>
                <div id="chart"></div>
            </div>
        )
    }
};

export default connect(state => ({
    glucose: state.glucoseObject.glucose
}))(GlucoseResults);

