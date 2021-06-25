import Machine from '../src/index.vue'

export default {
title: 'Machine',
component: Machine
}

const Template = (args) => ({
components: {
'do-machine':Machine
},
setup() {
// Story args can be spread into the returned object
return {
...args
};
},
template: `<div>
  <do-machine></do-machine>
</div>`
})

export const Primary = Template.bind({});
Primary.args = {
//value: "test"
}
