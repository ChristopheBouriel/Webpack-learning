const path = require('path')

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "js/site.js",
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[name][ext]' // Pour gérer le nommage et la structure depuis la v5
    },

    /*mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    }*/
    //inutile quand on a écrit les scripts dans le package.json

    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        //ident: 'postcss',
                        postcssOptions: {
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                        
                    }
                }, 'sass-loader'] // il y a un ordre : on utilise d'abord sass, puis css et enfin style
            },
            /** Webpack ne connait que le JS, donc s'il doit traiter un autre type de fichier
                 *  il faut utiliser le loader correspondant et lui indiquer :
                 *  "Si tu vois une extension .css ou .scss, alors utilise le sass-loader le css-loader et le style-loader"
                 *  La liste des loaders est disponible sur le site
                 */
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                /*use: [
                    {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images'
                    }
                    }
                ]*/
                /** Breaking change depuis la v5 : voir output en haut pour gérer les options ci-dessus
                 *  On utilise maintenant les Asset Modules qui permettent de ne pas utiliser de loaders
                 *  supplémentaires (comme url-loader, file-loader ou encore raw-loader pour les chaines
                 *  de caractères)
                 *  Dans type, si on laisse juste 'asset', webpack choisira lui-même entre /inline (injecté
                 *  dans le bundle comme URI pour les éléments de petite taille à des fins d'optimisation)
                 *  et /resource (fichier créé dans le dossier indiqué)
                 *  On peut aussi régler la taille limite qui décidera de l'un ou l'autre au lieu de celle
                 *  par défaut :
                 *              test: /\.(jpg|jpeg|gif|png)$/,
                 *              type: 'asset',
                                parser: {
                                  dataUrlCondition: {
                                    maxSize: 20 * 1024 // 20kb
                                  }
                                },
                 */
                type: 'asset/resource',
                /** On peut aussi changer le dossier de destination juste pour une règle particulière :
                 *              test: /\.svg$/,
                 *              type: 'asset/resource',
                 *              generator: {
                 *                  filename: 'icons/[name][ext]'
                 *              }
                 *  Dans le cas de inline, on peut encoder en autre chose que base 64, par exemple en utilisant mini-svg-data-uri :
                 *  const svgToMiniDataURI = require('mini-svg-data-uri'); --> au sommet du fichier
                 *  
                                test: /\.svg/,
                                type: 'asset/inline',
                                generator: {
                                    dataUrl: content => {
                                    content = content.toString();
                                    return svgToMiniDataURI(content);
                                    }
                                }
                 */
            },

            {
                test: /\.(woff(2)?|ttf|eot|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
                /** Ici, au moment de l'installation on le fait dans les dependencies (pas les dev-dependencies
                 *  car on en aura besoin en prod)
                 *  npm install @fontawesome/fontawesome-free --save
                */
            },

            {
                test: /\.js$/,
                exclude: /node_modules/, // Car il ne faut surtout pas transpiler ces fichiers de dépendances
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
                // En CLI npm install babel-loader @babel/core @babel/preset-env --save-dev
            }
        ]
    }
    
}