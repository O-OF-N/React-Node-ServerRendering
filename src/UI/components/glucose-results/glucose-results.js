import React from 'react';
import drawChart from './chart/draw-chart';
import {connect} from 'react-redux';


class GlucoseResults extends React.Component {
    constructor(props) {
        super(props);
        this.logit = this.logit.bind(this);
    }
    logit() {
        if (this.refs.chart && this.props.glucose) {
            const labels = this.props.glucose.map(glucose => glucose.date).toJS();
            const data = this.props.glucose.map(glucose => glucose.quantity).toJS();
            const canvas = this.refs.chart;

            const ctx = canvas.getContext("2d");
            canvas.width = 100;
            canvas.height = 100;
            canvas.style.width = '100px';
            canvas.style.height = '100px';
            drawChart(ctx,labels,data);
        }
    }
    render() {
        const style = {border:'1px solid',width:300,height:300};
        return (
            <div style={style}>
                <canvas ref="chart" width="200" height="200">
                </canvas>
                {this.logit() }
            </div>
        )
    }
};

export default connect(state => ({
  glucose: state.GlucoseObject.glucose
}))(GlucoseResults);