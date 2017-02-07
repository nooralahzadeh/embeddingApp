var webpack = require('webpack');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/js/foundation.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Main:'app/components/Main.jsx',
      Nav:'app/components/Nav.jsx',
      Word2Vec:'app/components/Word2Vec.jsx',
      About:'app/components/About.jsx',
      Examples:'app/components/Examples.jsx',
      Word2VecForm:'app/components/Word2VecForm.jsx',
      Word2VecMessage:'app/components/Word2VecMessage.jsx',
      Word2VecMessageDocs:'app/components/Word2VecMessageDocs.jsx',
      OpenApiCall:'app/api/OpenApiCall.jsx',
      ErrorModel: 'app/components/ErrorModel.jsx',
      Word:'app/components/Word.jsx',
      WordList:'app/components/WordList.jsx',
      CollapsibleTree: 'app/components/CollapsibleTree.jsx',
      D3Tree:'app/components/D3Tree.jsx',
      Visualization:'app/components/Visualization.jsx',
      applicationStyles:'app/styles/app.scss'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
      ,{
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },
  devtool: 'inline-source-map'
};
