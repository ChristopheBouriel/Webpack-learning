const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');


module.exports = merge( common, {
    mode: "development",
    //watch: true, --> plus utile car par défaut watch est à true quand on utilise le dev-server
    /** watchOptions: {
        ignored: /node_modules/
        },
        --> Déplacé dans l'objet de configuration du dev-server
     */
    devtool: "source-map",
    devServer: {
        port: 3030, // On spécifie le port
        open: true, /**  Ouvre automatiquement un onglet dans le navigateur par défaut, mais on peut en indiquer un autre :
                            open: {
                                app: {
                                    name: 'google-chrome',
                                },
                            },
                     */
        static: {directory: path.join( __dirname, 'dist')}, // On indique les fichiers du dist qui doivent être servis
        server: {
            options: {
                exclude: /node_modules/
            }
        },

        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
            progress: true,
            reconnect: 4,
        },

        compress: true,
        hot: false, /** Active le liveReload qui rafraichi automatiquement toute la page (comportement par défaut)
                     *  Si réglé à true, le liveReload est désactivé et les modifications sont transmises au navigateur
                     *  mais la page n'est pas entièrement rafraichie, seulement ce qui a changé
                     *  On peut aussi utiliser liveReload: false
                     */
        //liveReload: false,
        //https: true,
    },

    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', { loader: "css-loader", options: { sourceMap: true } }, {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                require('autoprefixer')()
                            ]
                        },
                        sourceMap: true
                    }
                }, { loader: "sass-loader", options: { sourceMap: true } }]
            },
        ]
    }
})

/** Il faut donc aussi modifier les scripts dans le package.json
 *  "watch": "node_modules/.bin/webpack --watch --mode development"
 *  devient
 *  "dev": "node_modules/.bin/webpack --config webpack.dev.js"
 *  et si on utilise le dev-server
 *  "dev": "node_modules/.bin/webpack-dev-server --config webpack.dev.js"
 * 
 */
