 const ExtractTextPlugin = require('extract-text-webpack-plugin');
 const glob = require('glob');
 const path = require('path');
 const PurifyCSSPlugin = require('purgecss-webpack-plugin');
 const postcss = require('postcss');
 
 module.exports = function (paths) {
	return {
		module: {
			rules: [
				{
					test: /\.scss$/,
					include: paths,
					use: ExtractTextPlugin.extract({
						publicPath:'../',
						fallback: 'style-loader',
						use: [
							'css-loader', 
							{
								loader: 'postcss-loader',
								options: { sourceMap: true, config: { path: 'postcss.config.js' } }
							},
							'sass-loader'
						]
					})
				},
				{
					test: /\.css$/,
					include: paths,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							'css-loader', 
							{
								loader: 'postcss-loader',
								options: { sourceMap: true, config: { path: 'postcss.config.js' } }
							}
						]
					})
				}
			]
		},
		plugins: [
			new ExtractTextPlugin('./css/[name].css'),
			new PurifyCSSPlugin({
				paths: glob.sync(path.join(__dirname, '../src/**/*.pug'),  { nodir: true }),
			})
		]
	};
};