<template>
  <div class="view">
    <component :is="demoPage"></component> 
  </div>
</template>

<script>
  export default {
    props: ['componentId'],
    data() {
      return {
        demoPage: null
      }
    },
    mounted() {
      const { id } = require(`../config/${this.componentId}`).default
      this.demoPage = require(`../demos/${id}.vue`)
    }
  }
</script>

<style scoped lang="stylus">
</style>