import React from 'react';
import * as Records from '../../records/records';
import { carbCoverage, bloodGlucose, bolusCalc, buttonImage, disclaimer } from '../styles';
import InfoImg from '../../images/info.png';


class popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: '', nocarb: '', gluc: '', CC: '', CF: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCarbSubmit = this.handleCarbSubmit.bind(this);
    this.handleBolusDose = this.handleBolusDose.bind(this);
    this.handleCFchange = this.handleCFchange.bind(this);
    this.handleCCchange = this.handleCCchange.bind(this);
    this.handleDisclaimer = this.handleDisclaimer.bind(this);
    this.handleCarbFormula = this.handleCarbFormula.bind(this);
    this.handleBloodGluFormula = this.handleBloodGluFormula.bind(this);


  }

  handleCarbFormula(event) {
    alert('CCD = Carbohydrate Coverage Dose = \nCC = Current Carb Count \nICR = Insulin/Carbohydrate Ratio \n\nCCD = CC * ICR')
  }

  handleBloodGluFormula(event) {
    alert('ISF = Insulin Sensitivity Factor \nGLU = Current Blood Glucose \nTAR = Target Blood Glucose \nCOR = Correction Calculation \nGCD = Glucose Correction Dose \n\nIf GLU <= TAR, Then GCD = 0 \nElse GCD = COR * 1')
  }

  handleDisclaimer(event) {
    alert('This calculator is intended for healthcare professionals and cannot replace clinical judgment.\nBefore ordering or administering a bolus dose of insulin:\n* Ensure your patient has not already received a bolus dose of insulin in the last 2-3 hours;\n* Consider the current clinical situation; and\n* Always confirm the calculated dose.\nIf you have any concerns about the calculated insulin bolus dose, contact the patients supervising physician.')
  }

  handleCCchange(event) {
    this.setState({ CC: (parseFloat(this.refs.CC.value)) });
  }

  handleCFchange(event) {
    this.setState({ CF: (parseFloat(this.refs.CF.value)) });
  }

  handleCarbSubmit(event) {
    this.ICR = 0;
    this.CCD = 0;
    this.setState({ result: ('') })
    this.carbCount = parseFloat(this.refs.CC.value)
    this.carbFactor = parseFloat(this.refs.CF.value)

    if (this.carbFactor > 0 && this.carbCount >= 0) {
      this.ICR = 1 / this.carbFactor
      this.CCD = Math.round(this.carbCount * this.ICR * 2) / 2
      this.setState({ nocarb: ('Carb Coverage Dose = ' + this.CCD + ' unit(s)') })
    }
    else {
      if (isNaN(this.carbFactor) || this.carbFactor <= 0) {
        this.refs.CF.focus()
        this.CCD = -1;
        this.setState({ nocarb: ('Carb factor can not be 0 or empty') })
      }
      else {
        this.refs.CC.focus()
        this.CCD = -1;
        this.setState({ nocarb: ('Carb factor can not be empty') })
      }
    }
  }


  handleSubmit(event) {
    this.COR = 0;
    this.GCD = 0;

    this.glucoseValue = parseFloat(this.refs.GLU.value)
    this.targetValue = parseFloat(this.refs.TAR.value)
    this.insulinValue = parseFloat(this.refs.ISF.value)
    this.setState({ result: ('') })

    if (isNaN(this.insulinValue) || this.insulinValue < 0) {
      this.refs.ISF.focus()
      this.GCD = -1
      this.setState({ gluc: ('Alert - Insulin Sensitivity Factor can not be empty') });
    }
    else if (isNaN(this.glucoseValue) || this.glucoseValue < 0) {
      this.refs.GLU.focus()
      this.GCD = -1
      this.setState({ gluc: ('Alert - Current Blood Glucose can not be empty') });

    }
    else if (isNaN(this.targetValue) || this.targetValue < 0) {
      this.refs.TAR.focus()
      this.GCD = -1
      this.setState({ gluc: ('Alert - Target Blood Glucose can not be empty') });

    }
    else {
      if (this.glucoseValue <= this.targetValue) {
        this.setState({ gluc: ('Alert - blood glucose below target. Do not give any insulin for glucose correction.') });
        this.GCD = 0
      }
      else {
        this.COR = (this.glucoseValue - this.targetValue) / this.insulinValue
        this.GCD = this.COR * 1
        this.GCD = Math.floor(this.GCD * 2) / 2
        this.setState({ gluc: ('Glucose Correction dose = ' + this.GCD + ' unit(s)') });
      }
    }
  }

  handleBolusDose(event) {
    if (isNaN(this.CCD) || isNaN(this.GCD) || this.CCD < 0 || this.GCD < 0) {
      this.setState({ result: ('Please fill all necessary fields to get TOTAL BOLUS DOSE') })
    }
    else {
      this.TBD = this.CCD + this.GCD
      this.setState({ result: ('TOTAL BOLUS DOSE = ' + this.TBD + ' unit(s)') })
    }
  }

  render() {
    return (
      <div>


        <div style={carbCoverage}>
        <a style={buttonStyle1} href='#' onClick={this.handleCarbFormula}>Formula</a>
          <h2>Carbohydrate Coverage</h2>
          <div>
            <label>Insulin-to-Carbohydrate Ratio: 1 unit covers: </label>
            <input type="number"
              placeholder="grams"
              required={true}
              ref="CF"
              onChange={this.handleCFchange} />
            <label> grams of carb</label>
          </div>
          <div>
            <label>Current Carb Count: </label>
            <input type="number"
              placeholder="grams"
              required={true}
              ref="CC"
              onChange={this.handleCCchange} />
            <label> grams of carb</label>
          </div>
          <div>
            <button className="btn btn-default" onClick={this.handleCarbSubmit}>Calculate</button>
          </div>
          <div>
            <label>{this.state.nocarb}</label>
          </div>
        </div>

        <div style={bloodGlucose}>
        <a style={buttonStyle1} href='#' onClick={this.handleBloodGluFormula}>Formula</a>
          <div>
            <h2>Blood Glucose Correction</h2>
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
            <button className="btn btn-default" onClick={this.handleSubmit}>Calculate</button>
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
            <button className="btn btn-default" onClick={this.handleBolusDose}>Total Bolus Dose</button>
          </div>
          <div>
            <label>{this.state.result}</label>
          </div>
        </div>
        <div style={disclaimer}>
          <button className="btn btn-default" onClick={this.handleDisclaimer}>Disclaimer</button>
        </div>
      </div>
    );
  }
}




export default popup;
