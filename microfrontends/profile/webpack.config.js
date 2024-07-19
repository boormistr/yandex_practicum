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
        port: 3005,
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
            name: 'profile',
            filename: 'remoteEntry.js',
            remotes: {
                shell: 'shell@http://localhost:3002/remoteEntry.js',
                cards: 'cards@http://localhost:3004/remoteEntry.js',
                profile: 'profile@http://localhost:3005/remoteEntry.js',
            },
            exposes: {
                './EditProfilePopup': './src/components/EditProfilePopup',
                './EditAvatarPopup': './src/components/EditAvatarPopup',
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: '^17.0.0',
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '^17.0.0',
                },
                'react-router-dom': {
                    singleton: true,
                    requiredVersion: '^5.0.0',
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            publicPath: '/',
        }),
    ],
};
