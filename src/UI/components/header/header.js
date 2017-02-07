import React from 'react';

const header = ({toggle}) => (<section style = {{backgroundColor:'blue'}}>
    <header>
        <div>
            <h1>Diabetes Management
                    <button className="btn btn-default" onClick={toggle}>Insulin Bolus Calculator</button>
            </h1>
        </div>
    </header>
</section>);

export default header;