const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCss = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const glob = require('glob');

const PATHS = {
	source: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'dist')
};

const common = merge([
	{
		entry: {
			'index': PATHS.source + '/index.js',
		},
		output: {
			path: PATHS.build,
			filename: 'js/[name].js'
		},
		devServer: {
			contentBase: path.join(__dirname, "dist"),
			compress: true,
			hot: true,
			open: true
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				chunks: ['index'],
				template: PATHS.source + '/index.pug'
			}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery'
			})
		]
	},
	pug(),
	images()
]);

module.exports = function (env) {
	if (env === 'production') {
		return merge([
			common,
			extractCss(),
			uglifyJS()
		]);
	};
	if (env === 'development') {
		return merge([
			common,
			devserver(),
			sass(),
			css()
		])
	}
};