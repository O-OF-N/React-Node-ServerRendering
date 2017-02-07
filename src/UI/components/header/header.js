import React from 'react';
import './header.css';
import { Button } from 'react-bootstrap';


const header = ({toggle}) => (<section className="section">
    <header>
        <div>
            <h1 className="header-text">Diabetes Management</h1>
            <span className="button-span">
                <Button bsStyle="primary" style={{ marginRight: '10' }} className="ibc-button" onClick={toggle}>Insulin Bolus Calculator</Button>
            </span>
        </div>
    </header>
</section>);

export default header;