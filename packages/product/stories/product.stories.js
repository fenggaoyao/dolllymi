import Product from '../src/index.vue'

export default {
title: 'Product',
component: Product
}

const Template = (args) => ({
components: {
'do-product':Product
},
setup() {
// Story args can be spread into the returned object
return {
...args
};
},
template: `<div>
  <do-product></do-product>
</div>`
})

export const Primary = Template.bind({});
Primary.args = {
//value: "test"
}
