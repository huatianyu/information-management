const CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack');
module.exports = {
  // externals: {
  //   OHIFViewer: OHIFViewer,
  // },
  transpileDependencies: ['vuetify'], //兼容edge写法

  configureWebpack: config => {
    config.entry = ["babel-polyfill", "./src/main.ts"];

    // if (process.env.NODE_ENV === "production") {
    return {
      plugins: [
        new CopyWebpackPlugin([
          {
            from: 'node_modules/@aspnet/signalr/dist/browser/signalr.min.js',
            to: 'dist',
          },
          {
            from:
              'node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js',
            to: 'dist',
          },

          {
            from: 'src/lib/abp.js',
            to: 'dist',
          },
          {
            from: 'src/lib/libs/umd/index.umd.js',
            to: 'dist',
          },
        ]),
        new webpack.ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery',
          'window.jQuery': 'jquery',
        }),
        // new webpack.ProvidePlugin({
        //   OHIFViewer: "OHIFViewer",
        //   $$: "OHIFViewer"
        // }),
      ],
    };
    // } else {
    //   return {
    //     plugins: [
    //       new CopyWebpackPlugin([
    //         {
    //           from: "node_modules/@aspnet/signalr/dist/browser/signalr.min.js",
    //           to: "dist"
    //         },
    //         {
    //           from:
    //             "node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr-client.js",
    //           to: "dist"
    //         },
    //         {
    //           from: "src/lib/abp.js",
    //           to: "dist"
    //         }
    //       ]),
    //       new webpack.ProvidePlugin({
    //         jQuery: "jquery",
    //         $: "jquery"
    //       })
    //     ]
    //   };
    // }
  },
};
