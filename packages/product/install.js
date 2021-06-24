import Product from './src/index.vue'

Product.install = app => {
app.component(Product.name, Product)
}

export default Product
