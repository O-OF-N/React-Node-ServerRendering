import React from 'react';
import drawChart from './chart/draw-chart';
import { connect } from 'react-redux';

const timeStringForGraph = date => new Date(date).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });

const timeStringForTooltip = date => new Date(date).toLocaleTimeString([], { hour12: true });



class GlucoseResults extends React.Component {
    constructor(props) {
        super(props);
        this.logit = this.logit.bind(this);
    }
    logit() {
        if (this.props.glucose) {
            const glucose = this.props.glucose.filter(g => g.quantity != null && g.date != null).sort((g1, g2) => g1.date > g2.date);
            const data = ['Blood Glucose', ...glucose.map(g => g.quantity).toJS()];
            const labels = ['x', ...glucose.map(g => timeStringForGraph(g.date)).toJS()];
            const toolTip = glucose.map((g, index) => { return { index: labels[index + 1], toolTipDate: timeStringForTooltip(g.date), source: g.source, value: g.value } })
            return drawChart(labels, data, toolTip);
        }
    }
    render() {
        const data = this.props.glucose.map(glucose => glucose.quantity).toJS();
        const chart = this.logit();
        console.log(this.props.style);
        return (
            <div>
                <h3>Blood Glucose</h3> <h5>(all sources for past 24 hours)</h5>
                <div>
                    <div id="chart" style={this.props.style}></div>
                </div>
                {chart.resize()}
            </div>
        )
    }
};

export default connect(state => ({
    glucose: state.glucoseObject.glucose
}))(GlucoseResults);

