import React from 'react';
import '../../public/terra/img/icon_sprite.png';
import '../../public/terra/img/icon_sprite@2x.png';

export default class Component extends React.Component {
    render() {
        const style = { width: 'inherit', height: 'inherit' };
        return (
            <div style={style}>
                <div id="app" style={style}>
                    <div className="loading loading-large">
                        <span className="icon-spinner" aria-hidden="true"></span> Loading
                        <marquee direction="right">&hellip;&nbsp;</marquee>
                    </div>
                </div>
                <script src='/javascripts/bundle.js' />
            </div>
        )
    }
}