import Planning from './src/index.vue'


const components = [
    Planning
]
const install = (app) => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export {
    Planning
}
export default {
    install
}