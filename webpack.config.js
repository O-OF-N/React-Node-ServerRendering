var webpack = require('webpack');
var path = require('path');
const PATHS = path.join(__dirname, 'public');

module.exports = {
    devtool: 'inline-source-map',
    entry: [
        'babel-polyfill',
        './src/UI/client.js'
    ],
    output: {
        path: path.join(__dirname, 'public/javascripts'),
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=react,presets[]=es2015']
            }, {
                test: /\.css?$/,
                loaders: ['style','css']
            }, {
                test: /\.(jpg|png|gif)$/,
                loader: 'file?name=[path][name].[hash].[ext]',
                include: PATHS.images
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=public/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ]
};