const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    target: 'web',
    devServer: {
        port: 3003,
        historyApiFallback: true,
        hot: 'only',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
    output: {
        publicPath: 'auto',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
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
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './Register': './src/components/Register',
                './Login': './src/components/Login',
                './ProtectedRoute': './src/components/ProtectedRoute',
            },
            remotes: {
                shell: 'shell@http://localhost:3002/remoteEntry.js',
            },
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: '^17.0.0',
                    eager: false
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '^17.0.0',
                    eager: false
                },
                'react-router-dom': {
                    singleton: true,
                    requiredVersion: '^5.0.0',
                    eager: false
                },
            },
        }),
    ],
};
