import {merge} from 'webpack-merge'
import {commonConfig} from './webpack.common.js'
import path from "node:path";

const localProxy = {
    target: {
        host: 'localhost',
        protocol: 'http:',
        port: 8081
    },
    ignorePath: false,
    changeOrigin: true,
    secure: false,
};

export default merge(commonConfig, {
    mode: 'development',
    devServer: {
        allowedHosts: 'auto',
        static: [
            {directory: path.join(process.cwd(), 'public'), watch: false},
            {directory: process.cwd(), watch: false}
        ],
        hot: true,
        proxy: {
            '/api': {...localProxy},
            '/version': {...localProxy},
        },
        watchFiles: 'src/**/*',
    },
    devtool: 'eval-source-map',
    plugins: []
});
