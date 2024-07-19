const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: './src/index',
    mode: 'development',
    target: 'web',
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
        port: 3004,
        historyApiFallback: true,
        hot: 'only',
    },
    output: {
        publicPath: 'auto',
        chunkFilename: '[id].[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.mjs', '.jsx', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                type: 'javascript/auto',
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'cards',
            filename: 'remoteEntry.js',
            remotes: {
                shell: 'shell@http://localhost:3002/remoteEntry.js',
                cards: 'cards@http://localhost:3004/remoteEntry.js',
            },
            exposes: {
                './Card': './src/components/Card',
                './AddPlacePopup': './src/components/AddPlacePopup',
                './ImagePopup': './src/components/ImagePopup',
                './PopupWithForm': './src/components/PopupWithForm',
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: "^17.0.2",
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: "^17.0.2",
                },
                'react-router-dom': {
                    singleton: true,
                    requiredVersion: "^5.3.4",
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            publicPath: '/',
        }),
    ],
};
