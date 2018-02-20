﻿var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');


module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./app.js",
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: __dirname + "/js",
        filename: "scripts.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
    watch:true
};