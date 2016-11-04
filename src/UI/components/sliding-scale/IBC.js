import React from 'react';
import * as Records from '../../records/records';
import { carbCoverage, bloodGlucose, bolusCalc } from '../styles';

class popup extends React.Component {


  constructor(props) {
    super(props);
    this.state = { result: '', nocarb: '', gluc: '', CC: '', CF: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCarbSubmit = this.handleCarbSubmit.bind(this);
    this.handleBolusDose = this.handleBolusDose.bind(this);
    this.handleCFchange = this.handleCFchange.bind(this);
    this.handleCCchange = this.handleCCchange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);


  }

  handleSubmitForm(event) {
    return false
  }

  handleCCchange(event) {
    this.setState({ CC: (parseFloat(this.refs.CC.value)) });
  }

  handleCFchange(event) {
    this.setState({ CF: (parseFloat(this.refs.CF.value)) });
  }


  handleCarbSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    this.ICR = 0;
    this.CCD = 0;

    this.carbCount = parseFloat(this.refs.CC.value)
    this.carbFactor = parseFloat(this.refs.CF.value)

    if (this.carbFactor > 0 && this.carbCount >= 0) {
      this.ICR = 1 / this.carbFactor
      this.CCD = Math.round(this.carbCount * this.ICR * 2) / 2
      this.setState({ nocarb: ('Coverage Dose = ' + this.CCD + ' units') })
      this.setState({ result: ('') })

    }
    else {
      if (isNaN(this.carbFactor) || this.carbFactor < 0) {
        this.refs.CF.focus()
      }
      else {
        this.refs.CC.focus()
      }

    }
    return false
  }


  handleSubmit(event) {
    this.COR = 0;
    this.GCD = 0;

    this.glucoseValue = parseFloat(this.refs.GLU.value)
    this.targetValue = parseFloat(this.refs.TAR.value)
    this.insulinValue = parseFloat(this.refs.ISF.value)

    if (isNaN(this.insulinValue) || this.insulinValue < 0) {
      this.refs.ISF.focus()
    }
    else if (isNaN(this.glucoseValue) || this.glucoseValue < 0) {
      this.refs.GLU.focus()
    }
    else if (isNaN(this.targetValue) || this.targetValue < 0) {
      this.refs.TAR.focus()
    }
    else {
      if (this.glucoseValue <= this.targetValue) {
        this.setState({ gluc: ('No Glucose Correction') });
        this.GCD = 0
      }
      else {
        this.COR = (this.glucoseValue - this.targetValue) / this.insulinValue
        this.GCD = this.COR * 1
        this.GCD = Math.floor(this.GCD * 2) / 2
        this.setState({ gluc: ('Glucose Correction dose = ' + this.GCD + ' units') });
      }
    }

  }

  handleBolusDose(event) {
    if (isNaN(this.CCD) || isNaN(this.GCD) || this.CCD < 0 || this.GCD < 0) {
      this.setState({ result: ('Please fill all necessary fields to get TOTAL BOLUS DOSE') })
    }
    else {
      this.TBD = this.CCD + this.GCD
      this.setState({ result: ('TOTAL BOLUS DOSE = ' + this.TBD + ' units') })
    }
  }

  render() {
    return (
      <div>
        <div style={carbCoverage}>

          <h2>Carbohydrate Coverage </h2>

          <br></br>

          <label>Insulin-to-Carbohydrate Ratio: 1 unit covers: </label>
          <input type="number"
            placeholder="grams"
            required={true}
            ref="CF"
            onChange={this.handleCFchange} />
          <label> grams of carb</label>

          <br></br>

          <label>Current Carb Count: </label>
          <input type="number"
            placeholder="grams"
            required={true}
            ref="CC"
            onChange={this.handleCCchange} />
          <label> grams of carb</label>
          <br></br>
          <button className="btn btn-default" onSubmit={this.handleSubmitForm} onClick={this.handleCarbSubmit}>Submit</button>
          <div>
            <label>{this.state.nocarb}</label>
          </div>
        </div>



        <div style={bloodGlucose}>
          <div>
            <h2>Blood Glucose Correction </h2>
          </div>

          <div>
            <label>Insulin Sensitivity Factor: 1 unit lowers blood glucose by </label>
            <input type="number"
              placeholder="mg/dl"
              ref="ISF"
              required="required" />
            <label>mg/dL</label>
          </div>

          <div>
            <label>Current Blood Glucose: </label>
            <input type="number"
              placeholder="mg/dL"
              ref="GLU" />
            <label>mg/dL</label>
          </div>

          <div>
            <label>Target Blood Glucose: </label>
            <input type="number"
              placeholder="mg/dL"
              ref="TAR" />
            <label>mg/dL</label>
          </div>

          <div>
            <button className="btn btn-default" onClick={this.handleSubmit}>submit</button>
          </div>

          <div>
            <label>{this.state.gluc}</label>
          </div>

        </div>

        <div style={bolusCalc}>
          <div>
            <h2>Total Rapid-Acting Insulin to Be Given:</h2>
          </div>

          <div>
            <label>{this.state.result}</label>
          </div>

          <div>
            <button className="btn btn-default" onClick={this.handleBolusDose}>Total Bolus Dose</button>
          </div>
        </div>
      </div>
    );
  }
}




export default popup;
