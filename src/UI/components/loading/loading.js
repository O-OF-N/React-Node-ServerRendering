import React from 'react';

const loading = () => (
    <div className="loading loading-large">
        <span className="icon-spinner" aria-hidden="true"></span> Loading
        <marquee direction="right">&hellip;&nbsp;</marquee>
    </div>
);

export default loading;