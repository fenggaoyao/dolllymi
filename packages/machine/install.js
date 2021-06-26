import Machine from './src/index.vue'

const components = [
    Machine
]
const install = (app) => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export {
    Machine,
    install
}