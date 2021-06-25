<template>
  <div class="el-card" :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'">
    <div v-if="$slots.header || header" class="el-card__header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="el-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
 import 'element-plus/lib/theme-chalk/el-card.css'
  export default {
    name: 'DoCard',  
    props: {
      header: {
      type: String,
      default: '',
    },
    bodyStyle: {
      type: [String, Object, Array],
      default: '',
    },
    shadow: {
      type: String,
      default: '',
    },
    }
  }
</script>
