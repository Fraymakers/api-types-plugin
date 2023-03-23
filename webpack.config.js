var path = require('path');
var fs = require('fs');
var homedir = require('os').homedir();
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  var pluginName = 'FraymakersApiTypes';
  var pluginOutputPath = path.resolve(__dirname, 'dist/' + pluginName);

  if (env.testing) {
    // Get or create plugins directory
    var dataPath = path.resolve(homedir, 'FrayToolsData');
    if (!fs.existsSync(dataPath)) {
      fs.mkdirSync(dataPath);
    }
    var pluginsPath = path.resolve(dataPath, 'plugins');
    if (!fs.existsSync(pluginsPath)) {
      fs.mkdirSync(pluginsPath);
    }
    // Set output path to the global plugins directory
    pluginOutputPath = path.resolve(pluginsPath, pluginName);
    if (!fs.existsSync(pluginOutputPath)) {
      fs.mkdirSync(pluginOutputPath);
    }
  }
  
  // Plugin setup
  var plugins = [];

  plugins.push(new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }));
  plugins.push(new HtmlWebpackPlugin({
    template: require.resolve('@fraytools/plugin-core/static/template.html')
  }));
  plugins.push(new CopyPlugin({
    patterns: [
      { from: 'static/manifest.json', to: 'manifest.json' }
    ]
  }));
  plugins.push(new webpack.DefinePlugin({
    'MANIFEST_JSON': JSON.stringify(require(path.resolve(__dirname, 'static/manifest.json')))
  }));
  return {
    mode: 'development',
    context: path.resolve(__dirname),
    target: 'web',
    plugins: plugins,
    entry: './src/ts/main.tsx',
    // Output file
    output: {
      filename: '[name].bundle.js',
      path: pluginOutputPath
    },
    // Define path aliases and declare valid script file types
    resolve: {
      // Note: Allows absolute paths relative to src/ts and gives precedence over node_modules
      modules: ['src/ts', 'node_modules'],
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      alias: {
        'react-dom': 'react-dom',
        'openfl': path.resolve (__dirname, 'node_modules/openfl/lib/openfl'),
      }
    },
    // Define the loader rules for how to handle importing each file type
    module: {
      rules: [
        {
          // Embed CSS in style tag on the page
          test: /\.s?css$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            { loader: 'sass-loader' },
          ],
          // Permit running node_modules through webpack
          include: __dirname
        },
        {
          // Support all combinations of js/ts files
          test: /\.tsx?|\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader'
          },
          // Permit running node_modules through webpack
          include: __dirname
        }
      ]
    },
    // Significantly reduces CPU usage
    watchOptions: {
      ignored: /node_modules/
    },
    devtool: 'source-map'
  };
};