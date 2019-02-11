const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devServer = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCss = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');
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
	images(),
	fonts()
]);

module.exports = function (env) {
	if (env === 'production') {
		return merge([
			common,
			extractCss(),
			uglifyJS(),
		]);
	};
	if (env === 'development') {
		return merge([
			common,
			devServer(),
			sass(),
			css()
		])
	}
};