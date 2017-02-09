import React from 'react';
import * as Records from '../../records/records';
import { carbCoverage, bloodGlucose, bolusCalc, disclaimer,buttonStyle, formStyle } from '../styles';
import InfoImg from '../../images/info.png';
import './IBC.css'


class popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: 'Total Bolus Dose = - units', nocarb: 'Carb Coverage Dose = - units', gluc: 'Glucose Correction Dose = - units', CC: '', CF: '' };
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
    this.setState({ result: ('Total Bolus Dose = - units') })
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
        this.setState({ nocarb: ('Carb factor can not be 0 or empty    ') })
      }
      else {
        this.refs.CC.focus()
        this.CCD = -1;
        this.setState({ nocarb: ('Carb factor can not be empty    ') })
      }
    }
  }


  handleSubmit(event) {
    this.COR = 0;
    this.GCD = 0;

    this.glucoseValue = parseFloat(this.refs.GLU.value)
    this.targetValue = parseFloat(this.refs.TAR.value)
    this.insulinValue = parseFloat(this.refs.ISF.value)
    console.log(this.glucoseValue);
    console.log('aaaaaaaaaaaaaaaaaaa');
    this.setState({ result: ('Total Bolus Dose = - units') })

    if (isNaN(this.insulinValue) || this.insulinValue < 0) {
      this.refs.ISF.focus()
      this.GCD = -1
      this.setState({ gluc: ('Alert - Insulin Sensitivity Factor can not be empty    ') });
    }
    else if (isNaN(this.glucoseValue) || this.glucoseValue < 0) {
      this.refs.GLU.focus()
      this.GCD = -1
      this.setState({ gluc: ('Alert - Current Blood Glucose can not be empty    ') });

    }
    else if (isNaN(this.targetValue) || this.targetValue < 0) {
      this.refs.TAR.focus()
      this.GCD = -1
      this.setState({ gluc: ('Alert - Target Blood Glucose can not be empty    ') });

    }
    else {
      if (this.glucoseValue <= this.targetValue) {
        this.setState({ gluc: ('Alert - blood glucose below target. Do not give any insulin.') });
        this.GCD = 0
      }
      else {
        this.COR = (this.glucoseValue - this.targetValue) / this.insulinValue
        this.GCD = this.COR * 1
        this.GCD = Math.floor(this.GCD * 2) / 2
        this.setState({ gluc: ('Glucose Correction dose = ' + this.GCD + ' unit(s)    ') });
      }
    }
  }

  handleBolusDose(event) {
    if (isNaN(this.CCD) || isNaN(this.GCD) || this.CCD < 0 || this.GCD < 0) {
      this.setState({ result: ('TOTAL BOLUS DOSE NOT PRESENT') })
    }
    else {
      this.TBD = this.CCD + this.GCD
      this.setState({ result: ('TOTAL BOLUS DOSE = ' + this.TBD + ' unit(s)    ') })
    }
  }

  render() {
    return (
      <div className = "Main-Div">
          <div>
          <div className = "Main-Div1" >
                <a className="Disclaimer-Button" href='#'  onClick={this.handleDisclaimer}>*Disclaimer</a>
                <h2 className="Insulin-Heading">Insulin Bolus Calculator </h2>
          </div>

          <div className = "Main-Div2" >
                <a className="Formula-Button" href='#'  onClick={this.handleCarbFormula}>Formula</a>
                <h4 className = "Carbohydrate-Coverage-Heading">Carbohydrate Coverage</h4>
          </div>

          <div className = "Carbohydrate-Coverage-Main">

              <div className = "Carb-Coverage">
                  <div className = "Insulin-to-Carbohydrate">
                    <p>
                      Insulin-to-Carbohydrate Ratio: 1 unit covers: <input className="TextField-Property" type="number" placeholder="grams" required={true} ref="CF" onChange={this.handleCFchange}/> grams
                    </p>
                  </div>

                  <div className = "Current-Carbohydrate">
                        <p>
                          Current Carb Count: 
                          <input className="TextField-Property" id="text-field-col" type="number" placeholder="grams" required={true} ref="CC" onChange={this.handleCCchange}/> grams
                        </p> 
                  </div>
              </div>

              <div className = "Carb-Coverage-Calc">
                  <p>
                    <label className="Calculate-Label-Carb">{this.state.nocarb}</label>           
                    <button className="Calculate-Button-Carb" onClick={this.handleCarbSubmit}>   Calculate</button>
                  </p>
              </div>

          </div>
          </div>

          <div>
          <div className = "Main-Div3" >
              <a className="Formula-Button" href='#'  onClick={this.handleCarbFormula}>Formula</a>
              <h4 className="Carbohydrate-Coverage-Heading">Blood Glucose Coverage</h4>
          </div>
          
          <div className = "BloodGlucose-Coverage-Main">

              <div className = "Glucose-Coverage">
                  <div className = "Insulin-Factor">
                    <p>
                      Insulin Sensitivity Factor: 1 unit lowers blood glucose by <input className="TextField-Property" type="number" placeholder="mg/dl" required={true} ref="ISF"/> mg/dl
                    </p>
                  </div>

                  <div className = "Insulin-Factor">
                    <p>
                      Current Blood Glucose: <input className="TextField-Property" type="number" placeholder="mg/dl" required={true} ref="GLU"/> mg/dl
                    </p>
                  </div>

                  <div className = "Target-Glucose">
                    <p>
                      Target Blood Glucose: <input className="TextField-Property" type="number" placeholder="mg/dl" required={true} ref="TAR"/> mg/dl
                    </p>
                  </div>


              </div>

              <div className = "Glucose-Coverage-Calc">
                  <p>
                    <label className="Calculate-Label-Glucose">{this.state.gluc}</label>           
                    <button className="Calculate-Button-Glucose" onClick={this.handleSubmit}>   Calculate</button>
                  </p>
              </div>

          </div>
          </div>

          <div>
          <div className = "Main-Div4" >
              <h4 className="Carbohydrate-Coverage-Heading">Total Rapid-Acting Insulin to Be Given:</h4>
          </div>

          <div className = "Bolus-Coverage-Calc">
                <p>
                  <label className="Calculate-Label-Bolus">{this.state.result}</label>           
                  <button className="Calculate-Button-Bolus" onClick={this.handleBolusDose}>   Calculate</button>
                </p>
          </div>

          </div>
      </div>
      
    );
  }
}




export default popup;
