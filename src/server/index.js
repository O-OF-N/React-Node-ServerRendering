import React from 'react';

export default class Component extends React.Component {
    render() {
        const style = { width: 'inherit', height: 'inherit' };
        return (
            <div style={style}>
                <div id="app" style={style}></div>
                <script src='/javascripts/bundle.js' />
            </div>
        )
    }
}