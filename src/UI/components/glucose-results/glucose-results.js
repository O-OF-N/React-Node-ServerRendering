import React from 'react';
import drawChart from './chart/draw-chart';
import { connect } from 'react-redux';
import Loading from '../loading/loading';
import Error from '../error/error';

const timeStringForGraph = date => new Date(date).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });

const timeStringForTooltip = date => new Date(date).toLocaleTimeString([], { hour12: true });



class GlucoseResults extends React.Component {
    constructor(props) {
        super(props);
        this.logit = this.logit.bind(this);
    }

    componentDidUpdate() {
        if (document.getElementById("chart")) {
            this.chart.resize({ width: document.getElementById("chart").offsetWidth });
        }
    }

    logit() {
        if (this.props.glucoseObject.glucose) {
            const glucose = this.props.glucoseObject.glucose.filter(g => g.quantity != null && g.date != null).sort((g1, g2) => g1.date > g2.date);
            const data = ['Blood Glucose', ...glucose.map(g => g.quantity).toJS()];
            const labels = ['x', ...glucose.map(g => timeStringForGraph(g.date)).toJS()];
            const toolTip = glucose.map((g, index) => { return { index: labels[index + 1], toolTipDate: timeStringForTooltip(g.date), source: g.source, value: g.value } })
            return drawChart(labels, data, toolTip);
        }
    }

    render() {
        const data = this.props.glucoseObject.glucose.map(glucose => glucose.quantity).toJS();
        this.chart = this.logit();
        return (
            <div style={this.props.style}>
                <h3>Blood Glucose</h3> <h5>(all sources for past 24 hours)</h5>
                {
                    this.props.glucoseObject.fetching? <Loading /> :
                            <div id="chart"></div>
                }
            </div>
        )
    }
};

export default connect(state => ({
    glucoseObject: state.glucoseObject
}))(GlucoseResults);

