import React from 'react';
import './sliding-scale.css';
import * as Constants from '../../utils/constants';

const values = {carbFactor:{value:0},carbCount:{value:0}};

var calcLabel = Constants.CarbLabel

function validation(values,carbs,event) {
  	if(values.carbFactor.value > 0 && values.carbCount.value > 0) {
  		carbCalculator(values,carbs)
  	} else {
  		carbs({carbValue: -1 , carbValidation: 0})
  		calcLabel = Constants.EmptyTextError;
  	}
}	

function onChangeMutate(value,event) {
		value.value = parseFloat(event.target.value);
		console.log(value.value)
}

function carbCalculator(values,carbs){
	  var ICR = 0;
      var carbValue = 0;
      ICR = 1/(values.carbFactor.value);
      carbValue = Math.round(values.carbCount.value * ICR * 2) / 2;
      carbs({carbValue: carbValue, carbValidation: 1});
}

const carbCoverage = ({updateCarbState, carbVal}) => {
	return (
	<div>
        <div className = "main-div2" >
            <h4 className = "heading-text">Carbohydrate Coverage</h4>
            <a className="formula-button" role="button" href="#modal-CC-formula" data-toggle="modal-inline">Formula</a>
            <aside id="modal-CC-formula" role="dialog" className="modal modal-inline" data-modal-width="50%">
	            <header>
		            <h2>Current Carbohydrate Formula</h2>
	            </header>
	                <div className="modal-body">
	                  <p className = "formula-font"> {Constants.CCDFormula}</p>
		                <p className = "formula-font"> {Constants.CCDFormula1} </p><br></br>
		                <p className = "legend-font"> {Constants.CCD}</p>
		                <p className = "legend-font"> {Constants.CC}</p>
		                <p className = "legend-font"> {Constants.ICR}</p>
		               
	                </div>
            </aside>
        </div>
	    <div>
            <div className = "carb-coverage">
                <div className = "small-top-text">
                    <p>
                      Insulin-to-Carbohydrate Ratio: 1 unit covers: <input className="textfield-property" type="number" placeholder="grams" required={true} onChange={onChangeMutate.bind(null,values.carbFactor)}/> grams
                    </p>
                </div>

                <div className = "small-bottom-text">
                        <p>
                          Current Carb Count: 
                          <input className="textfield-property" id="text-field-col" type="number" placeholder="grams" required={true}  onChange={onChangeMutate.bind(null,values.carbCount)}/> grams
                        </p> 
                </div>
            </div>

                <div className = "calc-div">
                  <p>
                  	{carbVal.carbValidation?<label className="calculate-label">Carb Coverage Dose = {carbVal.carbValue} unit(s)</label> : <label className="calculate-label">{calcLabel}</label>}
                   
                    <button className="calculate-button" onClick={validation.bind(null,values,updateCarbState)}>   Calculate</button>
                  </p>
                </div>
        </div>
    </div>
)};



export default carbCoverage;