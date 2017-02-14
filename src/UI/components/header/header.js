import React from 'react';
import './header.css';

const header = ({toggle}) => (
    <div className="section">
        <h1 className="header-text">Diabetes Management</h1>
        <span className="button-span">
            <button className="btn btn-default ibc-button" onClick={toggle}>Insulin Bolus Calculator</button>
        </span>
    </div>);

export default header;