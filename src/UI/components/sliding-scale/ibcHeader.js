import React from 'react';
import './IBC.css';
import * as Constants from '../../utils/constants';



const ibcHeader = ({toggle}) => (
      <div className = "Main-Div1" >
            <button className="close-button" type="button" onClick = {toggle}>Close</button>
            <a className="Disclaimer-Button" role="button" href="#modal-disclaimer" data-toggle="modal-inline">*Disclaimer</a>
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
            <h2 className="Insulin-Heading">Insulin Bolus Calculator </h2>
      </div>
	);

export default ibcHeader;