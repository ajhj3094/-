<template lang="pug">
v-container#cart
  v-table()
</template>

<script>

export default {
  name: 'Cart',
  components: {

  },
  data () {
    return {
      products: []
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/users/me/cart')
      this.products = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '失敗',
        text: '取得購物車失敗'
      })
    }
  }
}
</script>
