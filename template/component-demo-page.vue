<template>
  <div class="demo-page">
    <PLACEHOLDER:COMPONENTNAME></PLACEHOLDER:COMPONENTNAME>
  </div>
</template>

<script>
  import component from '../components/PLACEHOLDER:COMPONENTNAME.vue'
  export default {
    components: {
      'PLACEHOLDER:COMPONENTNAME': component
    }
  }
</script>

<style scoped lang="stylus">
  @import '../style/demo-page.styl'
</style>