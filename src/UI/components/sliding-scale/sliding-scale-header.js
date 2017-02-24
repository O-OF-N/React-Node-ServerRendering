import React from 'react';
import './sliding-scale.css';
import * as Constants from '../../utils/constants';



const ibcHeader = ({toggle}) => (
      <div className = "main-div1" >
            <button className="close-button" type="button" onClick = {toggle}>Close</button>
            <a className="disclaimer-button" role="button" href="#modal-disclaimer" data-toggle="modal-inline">*Disclaimer</a>
            <aside id="modal-disclaimer" role="dialog" className="modal modal-inline" data-modal-width="50%">
              <header>
                <h2>Disclaimer</h2>
              </header>

              <div className="modal-body">
                <p>
                {Constants.disclaimer}
                </p>
              </div>
            </aside>
            <h2 className="insulin-heading">Insulin Bolus Calculator </h2>
      </div>
	);

export default ibcHeader;