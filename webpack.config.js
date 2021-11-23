const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // plugin para manejar css iportado en js

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode:'development',  // puedo colocar en modo desarrollo 
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { // reconozco los archivos de js  y jsx  en este caso para pasarlo por el preset de babel para que sea compatible
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      { // lo mismo para los archivos html
        test: /\.html$/,
        use: [
          { loader: 'html-loader' }
        ]
      },
      { // carga de sass  y css
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [  // esto es para cargar el html desde  el directorio public  y ponerlo en el raiz de dist
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),// esta parte  transforma el sass en css
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devServer: {  // dev server activo para la carpeta  resultante dist
    
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3006,
  },

}