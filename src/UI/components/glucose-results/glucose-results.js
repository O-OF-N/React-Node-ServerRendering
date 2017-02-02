import React from 'react';
import drawChart from './chart/draw-chart';
import { connect } from 'react-redux';

const timeStringForGraph = date => new Date(glucose.date).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });

class GlucoseResults extends React.Component {
    constructor(props) {
        super(props);
        this.logit = this.logit.bind(this);
    }
    logit() {
        if (this.props.glucose) {
            const glucose = this.props.glucose.filter(g => g.quantity != null && g.date != null).sort((g1, g2) => g1.date > g2.date);
            const data = ['Blood Glucose', ...glucose.map(g => g.quantity).toJS()];
            const labels = ['x', ...glucose.map(timeStringForGraph).toJS()];
            const toolTip = glucose.map(glucose => { return { date: glucose.quantity, toolTip: glucose.source } })
            drawChart(labels, data, toolTip);
        }
    }
    render() {
        const style = {
            width: '48%', float: 'left', paddingLeft: '0.5%', maxWidth: '100%',
            maxHeight: '100%'
        };

        const styleFull = {
            width: '95%', height: '100%', float: 'left', paddingLeft: '0.5%', maxWidth: '100%',
            maxHeight: '100%'
        };
        const data = this.props.glucose.map(glucose => glucose.quantity).toJS();
        this.logit();
        return (
            <div style={styleFull}>
                <h3>Blood Glucose (all sources for past 24 hours)</h3>
                <div style={{ width: '100%', height: '100%' }}>
                    <div id="chart"></div>
                </div>
            </div>
        )
    }
};

export default connect(state => ({
    glucose: state.glucoseObject.glucose
}))(GlucoseResults);

