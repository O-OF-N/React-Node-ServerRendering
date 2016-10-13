import React from 'react';

export default class Component extends React.Component {
    render() {
        const style = { width: '100%', height: '100%' };
        return (
            <div style={style}>
                <div id="app"></div>
                <script src = '/javascripts/bundle.js'/>
            </div>
        )
    }
}