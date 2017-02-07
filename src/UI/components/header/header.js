import React from 'react';
import './header.css';
import Error from '../error/error';

const header = ({toggle}) => (<section className="section">
    <header>
        <div>
            <h1 className="header-text">Diabetes Management</h1>
            <Error />
            <span className="button-span">
                <button style={{ marginRight: '10' }} className="btn btn-default ibc-button" onClick={toggle}>Insulin Bolus Calculator</button>
            </span>
        </div>
    </header>
</section>);

export default header;