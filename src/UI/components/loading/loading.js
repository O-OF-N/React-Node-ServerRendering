import React from 'react';

const loading = () => (
    <div class="loading loading-large">
        <span class="icon-spinner" aria-hidden="true"></span> Loading
        <marquee direction="right">&hellip;&nbsp;</marquee>
    </div>
);

export default loading;