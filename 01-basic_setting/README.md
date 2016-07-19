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
8. webpack-dev-server 설치(npm install --save-dev webpack-dev-server)
9. package.json 에서 scripts 부분에 "start":"webpack-dev-server", "build":"webpack" 추가
10. babel 라이브러리 설치
11. babel loader 설정 추가 (webpack.config.js)
12. index.js, component.js ES6 문법 및 React 문법으로 수정