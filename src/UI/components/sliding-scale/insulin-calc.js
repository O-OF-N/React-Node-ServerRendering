import React from 'react';
import './sliding-scale.css';
import * as Constants from '../../utils/constants';
import FormulaBox from './sliding-scale-formula';

const values = { glucoseValue: { value: 0 }, insulinValue: { value: 0 }, targetValue: { value: 0 } };
var calcError = Constants.InsulinLabel

function validation(values, insulin, event) {
	if (values.glucoseValue.value > 0 && values.targetValue.value > 0 && values.insulinValue.value > 0) {
		if (values.glucoseValue.value > values.targetValue.value) {
			glucoseCalculator(values, insulin)
		}
		else {
			insulin({ glucoseVal: -1, gluValidation: false })
			calcError = Constants.GlucoseError;
		}
	} else {
		insulin({ glucoseVal: -1, gluValidation: false })
		calcError = Constants.EmptyTextError
	}
}

function onChangeMutate(value, event) {
	value.value = parseFloat(event.target.value);
}


/*
COR = Correction Calculation
GCD = Glucose Correction Dose
*/
function glucoseCalculator(values, insulin) {
	var COR = 0;
	var GCD = 0;
	COR = (values.glucoseValue.value - values.targetValue.value) / values.insulinValue.value
	GCD = COR * 1
	GCD = Math.floor(GCD * 2) / 2
	insulin({ glucoseVal: GCD, gluValidation: true, error: '' });
}

const insulin = ({updateGluState, insulin}) => {

	return (
		<div>
			<div className="main-div3" >
				<a className="formula-button" role="button" href="#modal-ISF-formula" data-toggle="modal-inline">Formula</a>
				<FormulaBox  />
				<h4 className="heading-text">Blood Glucose Coverage</h4>
			</div>

			<div>
				<div className="carb-coverage">
					<div className="small-top-text">
						<p>
							Insulin Sensitivity Factor: 1 unit lowers blood glucose by <input className="textfield-property" type="number" placeholder="mg/dl" required={true} onChange={onChangeMutate.bind(null, values.glucoseValue)} /> mg/dl
	                </p>
					</div>

					<div className="small-top-text">
						<p>
							Current Blood Glucose: <input className="textfield-property" type="number" placeholder="mg/dl" required={true} onChange={onChangeMutate.bind(null, values.insulinValue)} /> mg/dl
	                </p>
					</div>

					<div className="small-bottom-text">
						<p>
							Target Blood Glucose: <input className="textfield-property" type="number" placeholder="mg/dl" required={true} onChange={onChangeMutate.bind(null, values.targetValue)} /> mg/dl
	                </p>
					</div>
				</div>

				<div className="calc-div">
					<p>
						{insulin.gluValidation ? <label id="insulinLabel" className="calculate-label">Blood Glucose Dose = {insulin.glucoseVal} unit(s)</label> : <label id="insulinLabel" className="calculate-label">{calcError}</label>}
						<button className="calculate-button" onClick={validation.bind(null, values, updateGluState)}>   Calculate</button>
					</p>
				</div>
			</div>
		</div>
	)
};

export default insulin;