const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	mode: 'development',

	//entry point
	entry: path.join(__dirname, './frontend/root.js'),

	// compiled output js
	output: {
		filename: 'assets/js/[name].[hash].js',
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				// only process files in src folder
				include: /frontend/,
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
	},

	devServer: {
		contentBase: './dist',
		hot: true,
	},

	plugins: [
		new HtmlWebpackPlugin({
			inject: false,
			template: require('html-webpack-template'),
			title: 'SwiftSheet',
			lang: 'en-US',
			appMountId: 'app',
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1.0',
				},
				,
				{
					name: 'author',
					content: 'Alek Shnayder',
				},
				{
					name: 'description',
					content:
						'Upload a CSV to temporarily share an online interactive spreadsheet or mock API endpoint, then make it go away with no user account needed.',
				},
			],
			links: [
				'https://fonts.googleapis.com/css?family=Poiret+One&text=SwiftSheet:300',
				'https://fonts.googleapis.com/css?family=Quicksand:400,600,700',
				'https://fonts.googleapis.com/icon?family=Material+Icons',
				{
					href: '/assets/css/reset.css',
					rel: 'preload',
					as: 'style',
				},
				{
					href: './assets/css/reset.css',
					rel: 'stylesheet',
				},
				{
					href: './assets/images/favicon/favicon-32x32.png',
					rel: 'icon',
					sizes: '32x32',
					type: 'image/png',
				},
				{
					href: './assets/images/favicon/favicon-16x16.png',
					rel: 'icon',
					sizes: '16x16',
					type: 'image/png',
				},
			],
		}),
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].[hash].css',
		}),
	],

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
	},

	devtool: 'eval-source-map',
};
