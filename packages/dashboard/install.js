import Dashboard from './src/index.vue'

const components = [
    Dashboard
]
const install = (app) => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export {
    install,
    Dashboard
}