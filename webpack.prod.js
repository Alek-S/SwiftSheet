const webpack = require('webpack');
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'production',

	//entry point
	entry: './src/app.js',

	// compiled output js
	output: {
		filename: 'assets/js/[name].js'
	},


	module: {

		rules: [
			{
				test: /\.js?$/,
				// only process files in src folder
				include: /src/,
				use: {
					loader: 'babel-loader'
				}
			}
		],
	}, //end module


	plugins: [
		//remove localization from moment.js (significantly reduces vendor.js)
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)	
	],


	optimization: {
		//break out vendor module to seperate folder
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'initial',
				},
			},
		},
		minimizer: [new UglifyWebpackPlugin({
			//no console.log
			uglifyOptions: {
				compress: {
					drop_console: true,
				}
			}
		})],
	}
};
