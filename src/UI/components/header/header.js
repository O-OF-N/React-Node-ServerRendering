import React from 'react';
import './header.css';

const header = ({toggle}) => (<section style={{ backgroundColor: '#0092e0' }}>
    <header>
        <div>
            <h1 className="header-text">Diabetes Management</h1>
            <span className="button-span">
                <button style={{ marginRight: '10' }} className="btn btn-default ibc-button" onClick={toggle}>Insulin Bolus Calculator</button>
            </span>
        </div>
    </header>
</section>);

export default header;