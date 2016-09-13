import React from 'react';

export default class Component extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>Diabeties</title>
                    <link rel="stylesheet" href="/stylesheets/style.css"/>
                </head>
                <body>
                    <div id="app">
                    </div>
                    <script src = '/javascripts/bundle.js'/>
                </body>
            </html>
        )
    }
}