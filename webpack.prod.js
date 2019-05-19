const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',

	//entry point
	entry: './frontend/root.js',
	entry: path.join(__dirname, './frontend/root.js'),

	// compiled output js
	output: {
		filename: 'assets/js/[name].[contenthash].js',
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
	}, //end module

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
						'Upload a CSV file to quickly share a link to a interactive spreadsheet.',
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
		new PreloadWebpackPlugin({
			rel: 'preload',
			as(entry) {
				if (/\.css$/.test(entry)) return 'style';
				if (/\.woff$/.test(entry)) return 'font';
				if (/\.png$/.test(entry)) return 'image';
				return 'script';
			},
		}),
		// new BundleAnalyzerPlugin(),
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].[contenthash].css',
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
			new TerserPlugin({ sourceMap: false, extractComments: true }),
			new OptimizeCSSAssetsPlugin({}),
		],
	},
};
