import DoCard from './src/index.vue'

const components = [
    DoCard
]

const install = (app) => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export {
    install,
    DoCard
}