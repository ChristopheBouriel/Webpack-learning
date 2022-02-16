const path = require('path')

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "js/site.js",
        path: path.resolve(__dirname, 'dist')
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
                use: ['style-loader', 'css-loader', 'sass-loader'] // il y a un ordre : on utilise d'abord sass, puis css et enfin style
            }
        ]
    }
    /** Webpack ne connait que le JS, donc s'il doit traiter un autre type de fichier
     *  il faut utiliser le loader correspondant et lui indiquer :
     *  "Si tu vois une extension .css, alors utilise le css-loader et le style-loader"
     *  La liste des loaders est disponible sur le site
     */
}