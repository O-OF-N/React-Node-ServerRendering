var webpack = require('webpack');
var path = require('path');
const PATHS = path.join(__dirname, 'public');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const modulePaths = Object.keys(require('./package.json')['dependencies'])
    .reduce(function (paths, module) {
        console.log(module);
        return (module === 'terra') ? paths.concat(require(module).includePaths) : paths
    }, []);
console.log('modulePaths = ', modulePaths);
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
        extensions: ['', '.js'],
        root: modulePaths
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['babel?presets[]=react,presets[]=es2015']
            }, {
                test: /\.css?$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(jpg|png|gif)$/,
                loader: 'file?name=[path][name].[hash].[ext]',
                include: PATHS.images
            }, {
                test: /\.scss$/,
                loader: ExtractTextWebpackPlugin.extract('style', 'css!sass')
            }
        ]
    },
    sassLoader: {
        includePaths: modulePaths
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
        }),
        new ExtractTextWebpackPlugin('[name].css')
    ]
};