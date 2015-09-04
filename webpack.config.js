module.exports = {
	entry: "./main.js",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {
		loaders: [
		{ test: /\.css$/, loader: "style!css" },
		// **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
      // { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

      // // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // // loads bootstrap's css.
      // { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      // { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      // { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }

		]
	}
};