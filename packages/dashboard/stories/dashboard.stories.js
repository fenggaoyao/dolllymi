import Dashboard from '../src/index.vue'

export default {
title: 'Dashboard',
component: Dashboard
}

const Template = (args) => ({
components: {
'do-dashboard':Dashboard
},
setup() {
// Story args can be spread into the returned object
return {
...args
};
},
template: `<div>
  <do-dashboard></do-dashboard>
</div>`
})

export const Primary = Template.bind({});
Primary.args = {
//value: "test"
}
