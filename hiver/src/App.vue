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
  }
}
</script>

<style lang="scss">

</style>
