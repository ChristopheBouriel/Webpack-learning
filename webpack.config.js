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
}