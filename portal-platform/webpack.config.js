const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 引入插件
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers"); // 例如使用 Element Plus

const path = require("path");

module.exports = (mode) => {
  console.log(mode);
  
  // const envConfig = require(`./config/env.${
  //   env.production ? "production" : "development"
  // }.js`);

  return {
    mode: mode,//env.production ? "production" : "development",
    entry: "./src/main.ts",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
            "postcss-loader", // tailwind 加這個
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"], // 如果有用 scss/sass
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.ts$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: { appendTsSuffixTo: [/\.vue$/] },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      // 使用 HtmlWebpackPlugin
      new HtmlWebpackPlugin({
        // 指定模板檔案
        template: "./public/index.html",
        // 輸出的檔案名稱
        filename: "index.html",
        title: "Navigate", // 👈 這裡設定 title
        // 自動將所有打包的資源注入
        inject: "body",
      }),
      // 自動匯入 Vue API（不用每次 import { ref, reactive } from 'vue'）
      AutoImport({
        imports: ["vue", "vue-router", "vue-i18n", "@vueuse/core"],
        dts: "src/auto-imports.d.ts", // 產生型別檔，方便 TS 使用
        eslintrc: {
          enabled: true, // 會自動生成 .eslintrc-auto-import.json
        },
      }),

      // 自動註冊元件
      Components({
        dirs: ["src/components"], // 預設就是這個
        extensions: ["vue"],
        deep: true,
        dts: "src/components.d.ts",
        resolvers: [
          ElementPlusResolver(), // 如果用 Element Plus
        ],
      }),
    ],
    resolve: {
      extensions: [".ts", ".vue", ".js", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    devServer: {
      static: {
        // 這裡你可以指向一個空的 dist 資料夾，讓 Webpack 自動生成
        directory: path.join(__dirname, "dist"),
      },
      open: true,
      hot: true,
    },
  };
};
