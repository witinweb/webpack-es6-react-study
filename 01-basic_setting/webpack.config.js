const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const TARGET = process.env.npm_lifecycle_event; // npm script 실행 event

// 공통환경
const common = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015']
                },
                exclude: /node_modules/,
                include: PATHS.app
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack demo',
            template: 'node_modules/html-webpack-template/index.ejs',
            appMountId: 'app',
            inject: false
        })
    ]
};

// dev 설정
if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true, // HRM 활성화
            inline: true, // 페이지가 변경되면 새로고침함
            color: true, // 터미널 색 지정
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    });
}

// build 설정
if(TARGET === 'build') {
    //build용 설정 export
    module.exports = merge(common, {});
}