const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, './src'),
    entry: [
        'bootstrap-loader',
        'font-awesome/scss/font-awesome.scss',
        './app.scss',
        './app.js',
    ],
    output: {
        path: path.join(__dirname, './built'),
        publicPath: '/built/',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['*', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader',
                }),
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            },
            {
                test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
                use: 'imports-loader?jQuery=jquery',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('development') },
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true,
        }),
        new ExtractTextPlugin({
            filename: 'main.css',
            allChunks: true,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],
};
