import React from 'react';

class popup extends React.Component{


 constructor(props) {
    super(props);
    this.state = {result: '', nocarb: '', nogluc: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    if(isNaN(this.refs.CC) || isNaN(this.refs.CF) || isNaN(this.refs.GLU) || isNaN(this.refs.LIN) || isNaN(this.refs.ISF) || isNaN(this.refs.TAR)){
         this.refs.CC.style.bordercolor = "1px solid black"
    // }
    // if(isNaN(this.refs.INS)) {
    //   //this.refs.INS.select()
    }
    else {
        this.ICR = 0;
        this.CCD = 0;
        this.COR = 0;
        this.GCD = 0;
        this.TBD = 0;
        if(this.refs.CF.value > 0) {
          this.ICR= this.refs.INS.value/this.refs.CF.value
        }
        if(this.refs.CC.value < this.refs.CF.value){
          this.setState({nocarb:('No Carb Coverage ')});
        }
        else {
           this.setState({nocarb:('')});
           this.CCD = this.refs.CC.value * this.ICR
        }

        this.COR = (this.refs.GLU.value - this.refs.TAR.value)/this.refs.ISF.value
        this.GCD = this.COR * this.refs.LIN.value
        this.TBD = this.CCD + this.GCD
        if(this.refs.GLU.value <= this.refs.TAR.value){
          this.setState({nogluc:('No Glucose Correction')});
          this.setState({result:('Coverage Dose = ' + this.CCD+"\n"+'Glucose Correction dose = ' + this.GCD+"\n"+'TOTAL BOLUS DOSE = '+this.TBD+" Units")});
        }
        else {
          this.setState({result:('')});
          //alert('Coverage Dose = ' + this.CCD+"\n"+'Glucose Correction dose = ' + this.GCD+"\n"+'TOTAL BOLUS DOSE = '+this.TBD+" Units")
          this.setState({result:('Coverage Dose = ' + this.CCD+"\n"+'Glucose Correction dose = ' + this.GCD+"\n"+'TOTAL BOLUS DOSE = '+this.TBD+" Units")});
        }
    }
  }

  render(){
    return (
      <div>
         <div>
          <h2>Carbohydrate Coverage </h2>
        </div>
        <div>
          <label>Insulin-to-Carbohydrate Ratio: 1 unit covers: </label>
          <input type="number" 
                placeholder="grams" 
                ref="INS"/>
          <label>grams of carb</label>
        </div>
        <div>
          <label>Current Carb Count: </label>
          <input type="number"
                placeholder="grams"
                ref="CC"/>
          <label>grams of carb</label>
        </div>

        <div>
          <label>Coverage Factor: </label>
          <input type="number"
                placeholder="grams" 
                ref="CF"/>
        </div>
        <div>
        </div>
        <div>
          <label>{this.state.nocarb}</label>
        </div>
        <div>
          <h2>Blood Glucose Correction </h2>
        </div>
         <div>
          <label>Blood Glucose: </label>
          <input type="number" 
                placeholder="mg/dl" 
                ref="GLU"
                required = "required"/>
        </div>
         <div>
          <label>Insulin Dose: </label>
          <input type="number" 
                placeholder="unit" 
                ref="LIN"/>
        </div>
         <div>
          <label>Insulin Sensitivity Factor: </label>
          <input type="number" 
                placeholder="mg/dl" 
                ref="ISF"/>
        </div>
         <div>
          <label>Target Glucose: </label>
          <input type="number" 
                placeholder="mg/dl" 
                ref="TAR"/>
        </div>
        <div>
          <button className="btn btn-default" onClick={this.handleSubmit}>submit</button>
        </div>
        <div>
          <label>{this.state.nogluc}</label>
        </div>
        <div>
          <label>{this.state.result}</label>
        </div>
      </div>
    );
  }
}




export default popup;
