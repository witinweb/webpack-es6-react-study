1. 프로젝트 폴더 생성
2. npm init
3. npm install -g webpack (웹팩은 처음 설치시 글로벌로 설치한후 프로젝트에 설치한다
4. npm install --save-dev webpack
5. app 폴더 및 기본 파일 생성
app
    |-- index.js
    |-- component.js

index.js

    var component = require('./component');

    document.body.appendChild(component());
component.js

    module.exports = function () {
      var element = document.createElement('h1');

      element.innerHTML = 'Hello world';

      return element;
    };
6. webpack.config.js 생성


     const path = require('path');
        const HtmlWebpackPlugin = require('html-webpack-plugin');

        const PATHS = {
          app: path.join(__dirname, 'app'),
          build: path.join(__dirname, 'build')
        };

        module.exports = {
          // Entry accepts a path or an object of entries.
          // We'll be using the latter form given it's
          // convenient with more complex configurations.
          entry: {
            app: PATHS.app
          },
          output: {
            path: PATHS.build,
            filename: '[name].js'
          },
          plugins: [
            new HtmlWebpackPlugin({
              title: 'Webpack demo'
            })
          ]
        };
7. html-webpack-plugin 설치(npm install --save-dev html-webpack-plugin)
8. html-webpack-template 설치(npm install --save-dev html-webpack-template)
9. webpack-dev-server 설치(npm install --save-dev webpack-dev-server)
10. package.json 에 ShortCut code 추가
11. babel 라이브러리 설치
12. babel loader 설정 추가 (webpack.config.js)

    // 9.
    plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo',
                template: 'node_modules/html-webpack-template/index.ejs',
                appMountId: 'app',
                inject: false
            })
        ]

	// 10.
     "scripts": {
           "build": "webpack",
           "start": "webpack-dev-server"
         },


	// 12.
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
                   }
               ]
           },

index.js, component.js ES6 문법 및 React 문법으로 수정

-------------------

## Webpack Dev / Build 환경 분리

1. npm script event 분기처리

2. webpack 설정 분리를 위한 webpack-merge 설치

3. Dev 환경 HMR 활성화, sourcemaps 설정

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