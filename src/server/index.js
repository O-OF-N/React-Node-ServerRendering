import React from 'react';

export default class Component extends React.Component {
    render() {
        const style = { width: '100%', height: '100%' };
        const style1 = { width: 'inherit', height: 'inherit' };
        return (
            <div style={style}>
                <div id="app" style={style1}></div>
                <script src = '/javascripts/bundle.js'/>
            </div>
        )
    }
}