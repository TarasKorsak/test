 const ExtractTextPlugin = require('extract-text-webpack-plugin');
 const glob = require('glob');
 const path = require('path');
 const PurifyCSSPlugin = require('purgecss-webpack-plugin');

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
						use: ['css-loader', 'sass-loader']
					})
				},
				{
					test: /\.css$/,
					include: paths,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
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