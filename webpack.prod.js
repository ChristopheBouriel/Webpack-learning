const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge( common, {
    mode: "production"
})

/** Il faut donc aussi modifier les scripts dans le package.json
 *  "build": "node_modules/.bin/webpack --mode production"
 *  devient
 *  "prod": "node_modules/.bin/webpack --config webpack.prod.js"
 * 
 */