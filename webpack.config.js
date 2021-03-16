const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    publicPath: '',
    hot: true,
    inline: true,
    port: 9000,
    historyApiFallback: true,
    proxy: [
      {
        context: () => true,
      }
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
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json', // Not to confuse with manifest.json
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      mode: "production",
      navigationPreload: true,
      navigateFallback: "/index.html",
      runtimeCaching: [
        {
          // You can use a RegExp as the pattern:
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst',
        },
      ]
    }),
  ]
};
