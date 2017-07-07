var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './client');

const config = {
 entry: {
   main: APP_DIR + '/index.js'
 },
 output: {
   filename: 'webpack-bundle.js',
   path: BUILD_DIR,
 },
 module: {
   rules: [
     {
       test: /\.scss$/,
       use: [{
           loader: "style-loader" // creates style nodes from JS strings
       }, {
           loader: "css-loader" // translates CSS into CommonJS
       }, {
           loader: "sass-loader" // compiles Sass to CSS
       }]
     },
     {
       test: /\.(jsx|js)?$/,
       use: [{
         loader: "babel-loader",
         options: {
           cacheDirectory: true,
           presets: ['react', 'es2015']
         }
       }]
     }
   ],

 }
};

module.exports = config;
