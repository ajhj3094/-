<template lang="pug">
v-app
  Navbar
  v-main
    v-container(fluid)
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
