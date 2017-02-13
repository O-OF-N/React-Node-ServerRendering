import React from 'react';

export default class Component extends React.Component {
    render() {
        const style = { width: 'inherit', height: 'inherit' };
        return (
            <div style={style}>
                <div id="app" style={style}>
                    <div className="loading loading-large" style={{
                        display: 'block',
                        margin: 'auto auto',
                        position: 'fixed',
                        zIndex: '100',
                        opacity: '0.4',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        <span className="icon-spinner" aria-hidden="true"></span> Loading
                        <marquee direction="right">&hellip;&nbsp;</marquee>
                    </div>
                </div>
                <script src='/javascripts/bundle.js' />
            </div>
        )
    }
}