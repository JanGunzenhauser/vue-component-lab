<template>
  <div class="component-list">
    <div class="header">
      <input type="search" placeholder="Search for name or tags..." v-model="searchInput">
    </div>
    <ul>
      <router-link v-for="component in filteredComponents" tag="li" :to="'/' + component.id" :key="component.id">
        <span class="label">{{component.id}}</span>
        <div class="tags">
          <span v-for="(tag, index) in component.tags">{{tag}}</span>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import components from '../config/index'
  export default {
    data() {
      return {
        searchInput: ''
      } 
    },
    computed: {
      filteredComponents() {
        if (this.searchInput === '') return components
        return components.filter(component => {
          if (component.id.indexOf(this.searchInput) > -1) return true
          let tagMatched = false
          component.tags.map(tag => {
            if (tag.indexOf(this.searchInput) > -1) tagMatched = true
          })
          return tagMatched
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../style/component-list.styl'  
</style>