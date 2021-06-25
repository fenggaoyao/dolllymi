import Product from './src/index.vue'

const components = [
    Product
]
const install = (app) => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export {
    Product
}
export default {
    install
}