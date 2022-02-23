<template lang="pug">
v-container#cart
  v-data-table(
    :headers="headers"
    :items="products"
    :items-per-page="5"
    class="elevation-1"
  )
    template(#item.product.image="{ item }")
      v-img(:src='item.product.image' height='60' width='100' contain)
    template(#item.product.price="{ item }")
      v-subheader $ {{ item.product.price }}
    template(#item.quantity="{ item }")
      v-form.spin-button.mt-7.mr-4
        v-text-field(
          readonly
          dense
          width='20'
          type='number'
          v-model.number='item.quantity'
          min='10'
          :rules='qtyrules'
          hide-spin-buttons
          outlined
          append-icon='mdi-plus'
          prepend-inner-icon='mdi-minus'
          @click:append='item.quantity++;updateCart(item._id, item.quantity)'
          @click:prepend-inner='item.quantity > 1 ? item.quantity-- : null;updateCart(item._id, item.quantity)'
          @input='updateCart(item._id, item.quantity)'
          style='width: 140px'
        )
      v-btn(color='error' @click='updateCart(item._id, 0)') 刪除
</template>

<script>

export default {
  name: 'Cart',
  components: {

  },
  data () {
    return {
      headers: [
        {
          text: '圖片',
          align: 'start',
          sortable: false,
          value: 'product.image'
        },
        {
          text: '商品',
          sortable: false,
          value: 'product.name'
        },
        { text: '價格', value: 'product.price' },
        { text: '操作', value: 'quantity' }
      ],
      products: [],
      qtyrules: [
        v => v > 0 || '數量必須大於 0',
        v => !!v || '必填項目'
      ]
    }
  },
  methods: {
    async updateCart (id, quantity) {
      try {
        const index = this.products.map(item => item._id).indexOf(id)
        await this.api.patch('/users/me/cart',
          { product: this.products[index].product._id, quantity },
          {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          }
        )
        // 刪除按鈕
        if (quantity === 0) {
          this.products.splice(index, 1)
          // 購物車的數字才會及時更新
          this.$store.commit('user/updateCart', this.user.cart - 1)
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: '修改購物車失敗'
        })
      }
      // const arr2 = this.products.filter(item => {
      //   return item.product._id === id
      // })
      // this.products.forEach((value, index, arr) => {
      //   console.log(value, index, arr)
      // })
    },
    handleChangeValue (value) {
      console.log(value)
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/users/me/cart', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.products = data.result
      console.log(this.products[0])
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
