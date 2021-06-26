import Planning from './src/index.vue'


const components = [
    Planning
]
const install = (app) => {
    components.forEach(component => {
        app.component("DoPlanning", component)
    })
}

export {
    Planning,
    install
}