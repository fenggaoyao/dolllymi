import Card from '../src/index.vue'

export default {
  title: 'Card',
  component: Card
}

const Template = (args) => ({
  components: {
    'do-card': Card
  },
  setup() {
    // Story args can be spread into the returned object
    return {
      ...args
    };
  },
  template: `<div>
  <do-card :header="header"> 
     this is body
  </do-card>
</div>`
})

export const Primary = Template.bind({});
Primary.args = {
  header: "test"
}