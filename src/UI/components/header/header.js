import React from 'react';

const header = ({toggle}) => (<section className="demographics-banner">
    <header>
        <div className="demographics-row">
            <h1>Diabetes Management
                    <button className="btn btn-default" onClick={toggle()}>Insulin Bolus Calculator</button>
            </h1>
        </div>
    </header>
</section>);

export default header;