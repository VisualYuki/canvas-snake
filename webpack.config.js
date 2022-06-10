const path = require("path");

module.exports = {
	entry: "./src/index.ts",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js",
	},
	module: {
		rules: [{ test: /\.tsx?$/, loader: "ts-loader" }],
	},
	mode: "development",
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	devServer: {
		watchFiles: path.resolve(__dirname, "dist"),
		static: ["dist"],
		hot: true,
	},
};
