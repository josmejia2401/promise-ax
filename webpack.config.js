const path = require("path");
const isLocal = true;
const basePath = __dirname;
const distPath = "build";
module.exports = {
    mode: isLocal ? "development" : "production",
    entry: {
        app: ['./index.js'],
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    output: {
        path: path.join(basePath, distPath),
        filename: "[name].js",
    },
};
