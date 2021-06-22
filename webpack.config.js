const path = require('path');
const { resolve } = path;
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  cache: true,
  entry: './src/index.tsx',
  resolve: { extensions: [ '.ts', '.tsx', '.js', '.css', '.scss' ] },
  output: {
    path: resolve(__dirname, 'public/build'),
    filename: './bundle.js'
  },
  devServer: {
    writeToDisk: () => true,
    port: 8080,
    public: "localhost:8080",
    host: "0.0.0.0",
    open: true,
    contentBase: './public/'
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

  module: {
    rules: [
      { test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader',
            options: {
              url: false,
              modules: { mode: 'local', localIdentName: '[local]__[hash:base64:8]' }
            }
          },
          { loader: 'sass-loader' },
        ]
      },
      { test: /\.tsx?$/,
        use: [
          { loader: 'ts-loader' },
        ]
      }
    ]
  }
};
