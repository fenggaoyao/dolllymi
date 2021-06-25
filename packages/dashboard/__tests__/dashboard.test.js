import {
    mount
} from '@vue/test-utils'
import Dashboard from '../src/index.vue'

const _mount = (template) => mount({
    components: {
        'do-dashboard': Dashboard
    },
    template
})
describe('Dashboard', () => {
    test('sample', () => {
        const wrapper = mount(Dashboard)
        expect(wrapper.html()).toContain("用户名")
    })

})