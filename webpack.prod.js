import {merge} from 'webpack-merge'
import {commonConfig} from './webpack.common.js'
import path from "node:path";
import {WebpackManifestPlugin} from 'webpack-manifest-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import {CleanWebpackPlugin} from 'clean-webpack-plugin';


export default merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {ecma: 8},
                    compress: {ecma: 5, warnings: false, inline: 2},
                    mangle: {safari10: true},
                    output: {ecma: 5, comments: false, ascii_only: true}
                },
                parallel: true,
                extractComments: false,
                // cache: true,
            })
        ],
    },
    output: {
        filename: "[name].[contenthash].js",
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin(),
        new BundleAnalyzerPlugin(),
    ]
});
