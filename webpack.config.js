const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9000,
    historyApiFallback: true,
    proxy: [
      {
        context: '**',
      },
    ]
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        use: [
          {
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            },
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.css', '.scss', '.html'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin(
    {
      template: 'assets/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "assets/images"), to: path.resolve(__dirname, "dist/images") },
        { from: path.resolve(__dirname, "src/common.css"), to: path.resolve(__dirname, "dist/common.css") },
      ],
    }),
  ]
};
