import Planning from '../src/index.vue'

export default {
title: 'Planning',
component: Planning
}

const Template = (args) => ({
components: {
'do-planning':Planning
},
setup() {
// Story args can be spread into the returned object
return {
...args
};
},
template: `<div>
  <do-planning></do-planning>
</div>`
})

export const Primary = Template.bind({});
Primary.args = {
//value: "test"
}
