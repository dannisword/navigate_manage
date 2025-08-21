## webpack 安裝套件
npm install --save-dev webpack webpack-cli webpack-dev-server vue-loader @vue/compiler-sfc css-loader style-loader
npm install html-webpack-plugin
npm install vue

webpack & webpack-cli: Webpack 的核心和指令列工具。
webpack-dev-server: 提供一個輕量級的開發伺服器，支援熱更新。
vue-loader: 讓 Webpack 能夠理解並處理 .vue 單一檔案元件。
@vue/compiler-sfc: Vue 3 的編譯器，用來編譯 <template> 和 <script> 區塊。
css-loader & style-loader: 處理 CSS 檔案。

## tailwindcss 
npm install -D tailwindcss@3 postcss autoprefixer 
npm install postcss-loader
### 初始化設定檔
npx tailwindcss init -p
產生檔案  
tailwind.config.js
postcss.config.js

## 設定 Webpack
參考檔案 webpack.config


## 加入 typescript 
yarn add -D typescript ts-loader
npx tsc --init
## pinia
yarn add pinia
yarn add pinia-plugin-persistedstate
yarn add unplugin-auto-import
yarn add unplugin-vue-components
## axios
yarn add axios
## dayjs
yarn add dayjs
## lodash
yarn add lodash
## i18n
yarn add vue-i18n

##
npm install --save-dev style-loader css-loader sass-loader sass


## mdi icon
@mdi/js


## route
yarn add vue-router

yarn add @vueuse/core
yarn add -D @types/node

## 專案結構
├── dist/
├── node_modules/
├── public/
│   ├── index.html
├── src/
│   ├── App.vue
│   ├── main.js
├── package.json
├── webpack.config.js

## 執行方式
npm run serve
