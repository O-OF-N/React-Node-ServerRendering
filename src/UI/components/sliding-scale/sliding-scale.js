import React from 'react';
import * as Records from '../../records/records';
import './sliding-scale.css';
import * as Constants from '../../utils/constants';
import Carbs from './carb-coverage.js';
import SlidingScaleHeader from './sliding-scale-header.js';
import Insulin from './insulin-calc.js';
import Bolus from './bolus-calc.js'


class popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {carb: {carbValue: -1 , carbValidation: 0}, insulin:{glucoseVal: -1, gluValidation:false, error: 'Blood Glucose Dose =  - unit(s)'}, bolus:{totalBolus: -1, bolusValidation: false, error: 'Total Bolus Dose =  - unit(s)'}};
  }

  updateCarbState(carb){
    this.setState({carb})
  }

  updateGluState(insulin){
    this.setState({insulin})
  }

  updateBolusState(bolus){
    this.setState({bolus})
  }

  render() {
    return (
      <div>
          <div><SlidingScaleHeader toggle = {this.props.toggle} /></div>
          <div><Carbs updateCarbState = {this.updateCarbState.bind(this)} carbVal = {this.state.carb} /></div>
          <div><Insulin updateGluState = {this.updateGluState.bind(this)} insulin = {this.state.insulin} /></div>
          <div><Bolus updateBolusState = {this.updateBolusState.bind(this)} bolus = {this.state.bolus} carbVal = {this.state.carb.carbValue} gluVal = {this.state.insulin.glucoseVal} /></div>
      </div>
      
    );
  }
}




export default popup;
