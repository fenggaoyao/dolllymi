'use strict'

if (process.env.NODE_ENV === 'production') {
module.exports = require('./dist/product.cjs.prod.js')
} else {
module.exports = require('./dist/product.cjs.js')
}
