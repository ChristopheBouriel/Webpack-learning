const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const terserJsPlugin = require('terser-webpack-plugin');


module.exports = merge( common, {
    mode: "production",
    // devtool: "source-map", Il n'est pas déconseillé d'envoyer les "source maps" en prod mais je le ferai uniquement pour le dev
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [/**'style-loader' Ici on change le loader pour la prod afin d'extraire le css
                                        dans un fichier séparé et on indique celui qui provient du mini-css-extract-plugin
                                        Voir juste en dessous
                                        */
                {
                    loader: miniCssExtractPlugin.loader
                }
                , 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                        
                    }
                }, 'sass-loader']
            },
        ]
    },
    /** En utilisant optimization.minimizer, on écrase les valeurs par défaut fournies par webpack
     *  et on va devoir manuellement installer le terser-plugin qui a été écrasé et l'importer dans
     *  ce fichier de config
     */
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                        preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                        ],
                    },
                }),
            new terserJsPlugin({ parallel: true })
        ],
      },
    plugins: [
        new miniCssExtractPlugin({
            filename: 'css/[name]-[contenthash].css'
        })
    ]
})

/** Il faut donc aussi modifier les scripts dans le package.json
 *  "build": "node_modules/.bin/webpack --mode production"
 *  devient
 *  "prod": "node_modules/.bin/webpack --config webpack.prod.js"
 * 
 */