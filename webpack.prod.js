const webpack = require('webpack');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;

module.exports = {
	mode: 'production',

	//entry point
	entry: './src/root.js',

	// compiled output js
	output: {
		filename: 'assets/js/[name].js',
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				// only process files in src folder
				include: /src/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	}, //end module

	plugins: [new BundleAnalyzerPlugin()],

	optimization: {
		//break out vendor module to separate folder
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'initial',
				},
			},
		},
		minimizer: [
			new UglifyWebpackPlugin({
				//no console.log
				uglifyOptions: {
					compress: {
						drop_console: true,
					},
				},
			}),
		],
	},
};
