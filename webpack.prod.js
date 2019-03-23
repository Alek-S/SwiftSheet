const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						},
					},
					'css-loader',
				],
			},
		],
	}, //end module

	plugins: [
		new BundleAnalyzerPlugin(),
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].css',
		}),
	],

	optimization: {
		//break out vendor module to separate folder
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'initial',
				},
			},
		},
		minimizer: [
			new UglifyWebpackPlugin({
				uglifyOptions: {
					compress: {
						drop_console: true,
					},
					output: {
						comments: false,
					},
				},
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
	},
};
