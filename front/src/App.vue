<template lang="pug">
v-app
  Navbar.z-100
  v-main
    //- 很重要，否則做路由參數時更換網址 id 頁面不會重新渲染
    router-view(:key='$route.fullPath')
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  async created () {
    this.$store.dispatch('user/getInfo')
  }
}
</script>
