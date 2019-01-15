const webpack = require('webpack');

module.exports = function () {
	return {
		devServer: {
			stats: 'errors-only',
			port: 9000
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	}
};