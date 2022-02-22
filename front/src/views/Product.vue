<template lang="pug">
v-container#product
  v-overlay.text-center(:value="!this.sell" dark)
    v-progress-circular.mx-auto(indeterminate size="64")
    h1 商品已下架
  v-row
    v-col(cols='6')
      h1 {{ name }}
    v-col(cols='6')
      h4.text-right $ {{ price }}
      v-form
        v-text-field(type='number' v-model.number='quantity' min='0' :rules='qtyrules')
      v-btn(color='primary' @click='addCart') 加入購物車
    v-col(cols='12')
      v-img.w-100(:src='image')
      p(style='white-space: pre;') {{ description }}
</template>

<script>
export default {
  name: 'Product',
  components: {

  },
  data () {
    return {

      name: '',
      price: 0,
      description: '',
      image: '',
      sell: false,
      category: '',
      // 使用者加幾個進購物車
      quantity: 0,
      qtyrules: [
        v => v > 0 || '數量必須大於 0',
        v => !!v || '必填項目'
      ]
    }
  },
  methods: {
    addCart () {
      this.$store.dispatch('user/addCart', { id: this.$route.params.id, quantity: this.quantity })
    }
  },
  computed: {

  },
  async created () {
    try {
      // 用路由參數把網址的 id 抓進來
      const { data } = await this.api.get('/products/' + this.$route.params.id)
      this.name = data.result.name
      this.price = data.result.price
      this.description = data.result.description
      this.image = data.result.image
      this.sell = data.result.sell
      this.category = data.result.category
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>
