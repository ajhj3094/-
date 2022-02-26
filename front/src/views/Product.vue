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
        v-text-field(
          readonly
          height='20'
          width='50'
          type='number'
          v-model.number='quantity'
          min='0'
          :rules='qtyrules'
          hide-spin-buttons
          outlined
          append-icon='mdi-plus'
          prepend-inner-icon='mdi-minus'
          @click:append='quantity++'
          @click:prepend-inner='quantity > 0 ? quantity-- : null'
        )
      v-btn(color='primary' @click='addCart') 加入購物車
    v-col(cols='12')
      v-img.w-100(:src='image')
      p(style='white-space: pre;') {{ description }}
    v-col(cols='12')
      v-textarea(
        outlined
        v-model='form.text'
        @keydown.enter='submit()'
      )
      v-btn(@click='submit()') 送出
    v-col(cols='12')
      v-rating(
        v-model='form.rating'
        background-color="grey lighten-1"
        color="warning"
        dense
        half-increments
        hover
        length="5"
        size="33"
        value="3"
      )
      v-avatar(

      )
        v-img(:src='"https://source.boringavatars.com/beam/120/" + this.user.token')
      table
        tr
          td(v-for='item in review' :key='item._id')
            | {{ item.user }}
            br
            | {{ item.rating }}
            br
            | {{ item.text }}
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
      ],
      review: [],
      form: {
        rating: 3,
        text: '嗨'
      },
      starRating: 3
    }
  },
  methods: {
    addCart () {
      this.$store.dispatch('user/addCart', { product: this.$route.params.id, quantity: this.quantity })
    },
    async submit () {
      try {
        if (!this.user.isLogin) {
          this.$swal({
            icon: 'success',
            title: '未登入',
            text: '請先登入'
          })
          this.$router.push('/login')
          return
        } else if (this.form.text.length === 0) {
          this.$swal({
            icon: 'error',
            title: '傳送失敗',
            text: '輸入欄位是空的'
          })
          return
        }
        const { data } = await this.api.post('/products/' + this.$route.params.id, this.form, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.review = data.result.review
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: error.response.data.message
        })
      }
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
      this.review = data.result.review
      document.title = `Hiver | ${this.name}`
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>
