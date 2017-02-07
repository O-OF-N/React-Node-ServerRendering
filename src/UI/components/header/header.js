import React from 'react';

const header = ({toggle}) => (<section style={{ backgroundColor: '#0092e0' }}>
    <header>
        <div>
            <h1 style={{ color: 'white' }} >Diabetes Management</h1>
            <button style={{ float: 'right' }} className="btn btn-default" onClick={toggle}>Insulin Bolus Calculator</button>
        </div>
    </header>
</section>);

export default header;