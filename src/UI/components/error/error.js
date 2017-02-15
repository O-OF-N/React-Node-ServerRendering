import React from 'react';
import './error.css';

const error = () => (
    <div className="alert alert-error" role="alert">
        <p className= "error-margin"><strong>Error!</strong> Your action was unsuccessful.</p>
    </div>
);

export default error;