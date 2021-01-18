const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


let htmlPageNames = ['home'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});


module.exports = {
  mode: 'development',
  entry: './src/js/canvas.js',
  output: {
    path: __dirname + '/dist/',
    filename: './js/canvas.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
//      {
//        test: /\.(png|svg|jpg|gif|jpe?g)$/,
//        use: [
//          {
//            options: {
//              name: "[name].[ext]",
//              outputPath: "images/"
//            },
//            loader: "file-loader"
//          }
//        ]
//      },
//      {
//          test: /\.(png|jp(e*)g|svg)$/,
//          use: [{
//              loader: 'url-loader',
//              options: {
//                  limit: 8000, // Convert images < 8kb to base64 strings
//                  name: 'images/[hash]-[name].[ext]'
//              }
//          }]
//      },      {
//        test: /\.(png|svg|jpg|gif|jpe?g)$/,
//        use: [
//          {
//            options: {
//              name: "[name].[ext]",
//              outputPath: "images/"
//            },
//            loader: "file-loader"
//          }
//        ]
//      },
//      {
//          test: /\.(png|jp(e*)g|svg)$/,
//          use: [{
//              loader: 'url-loader',
//              options: {
//                  limit: 8000, // Convert images < 8kb to base64 strings
//                  name: 'images/[hash]-[name].[ext]'
//              }
//          }]
//      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }
        ]
      },
//      {
//        test: /\.html$/,
//        use: [
//          // ...The other file-loader and extract-loader go here.
//          {
//            loader: 'html-loader'
//            options: {
//              // THIS will resolve relative URLs to reference from the app/ directory
//              root: path.resolve(__dirname, 'app')
//            }
//          }
//        ]
//      },
      //,
//      {
//          test: /\.(html)$/,
//          use: {
//              loader: 'html-loader',
//              options: {
//                  attrs: ['img:src', 'link:href']
//              }
//          }
//      }

    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] },
      files: ['./dist/*'],
      notify: false
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: 'favicon.ico',
      template: 'src/index.html'
    })
  ].concat(multipleHtmlPlugins),
  watch: true,
  devtool: 'source-map'
}
