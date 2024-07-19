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
        port: 3002,
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
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'shell',
            filename: 'remoteEntry.js',
            remotes: {
                auth: 'auth@http://localhost:3003/remoteEntry.js',
                cards: 'cards@http://localhost:3004/remoteEntry.js',
                profile: 'profile@http://localhost:3005/remoteEntry.js',
                shell: 'shell@http://localhost:3002/remoteEntry.js',
            },
            exposes: {
                './CurrentUserContext': './src/contexts/CurrentUserContext',
            },
            shared: [{
                react: {
                    singleton: true,
                    requiredVersion: '^17.0.2',
                    eager: true
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '^17.0.2',
                    eager: true
                },
                'react-router-dom': {
                    singleton: true,
                    requiredVersion: '^5.3.4',
                    eager: true
                },
            },'src/contexts/CurrentUserContext'],
        }),
    ],
};
