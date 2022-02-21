<template lang="pug">
v-app
  Navbar.z-100
  v-main
    router-view
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
