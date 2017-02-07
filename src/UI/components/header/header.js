import React from 'react';

const header = () => (<section className="demographics-banner">
    <header>
        <div className="demographics-row">
            <h1>Diabetes Management
                    <button className="btn btn-default" onClick={toggle.bind(null, dispatch)}>Insulin Bolus Calculator</button>
            </h1>
        </div>
    </header>
</section>);

export default header;