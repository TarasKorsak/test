module.exports = function (paths) {
	return {
		module: {
			rules: [
				{
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
					loader: 'file-loader',
					options: {
						name: 'fonts/[name].[ext]'
					}
				}
			]
		}
	};
};