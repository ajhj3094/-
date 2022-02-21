<template lang="pug">
#adminproducts
  h1.text-center 商品管理
  .text-center
    v-dialog(v-model='dialog' width='500' @click:outside='resetForm()')
      template(v-slot:activator='{ on, attrs }')
        v-btn(color='red lighten-2' dark v-bind='attrs' v-on='on').
          新增商品
      v-card
        v-card-title.text-h5.grey.lighten-2.
          {{ isEdit }}
        v-form.mx-5.my-5(ref='form' v-model='valid' lazy-validation)
          v-text-field(v-model='form.name' outlined :counter='10' :rules='pnameRules' label='商品名稱' required)
          v-text-field.mt-2(type='number' outlined v-model='form.price' :counter='10' :rules='priceRules' label='商品價格' required prefix='$')
          v-select.mt-5.test123(v-model='form.category' outlined :items='items' :rules="[v => !!v || 'Item is required']" label='商品分類' required)
          v-textarea.mt-5(
            v-model='form.description'
            placeholder='請輸入商品描述'
            clearable
            clear-icon="mdi-close-circle"
            outlined
            name='input-7-4'
            label='商品描述'
            value=''
          )
          v-radio-group(v-model='form.sell' mandatory)
            v-radio(label='上架' :value='true')
            v-radio(label='下架' :value='false')
          img-inputer(
            accept='image/*'
            v-model='form.image'
            theme='light'
            size='large'
            bottom-text='點選或拖拽圖片以修改'
            placeholder='點選或拖曳選擇圖片'
            hover-text='點選或拖曳選擇圖片'
            :max-size='1024'
            exceed-size-text='檔案大小不能超過'
          )
        v-divider
        v-card-actions
          v-spacer
          v-btn.mr-1(:disabled='modalSubmitting' color='error' @click='resetForm()').
            取消
          v-btn.mr-1(color='primary' dark @click='reset()').
            清空表單
          v-btn.mr-4(:disabled='!valid || modalSubmitting || form.image === null' color='success' @click='validate();submitModal()').
            完成送出
  v-simple-table
    template(v-slot:default)
      thead
        tr
          th.text-left(
            v-for='thead in theads'
            :key='thead.name'
          ) {{ thead }}
      tbody
        tr(
          v-for='product in products'
          :key='product.name'
        )
          td
            img(v-if='product.image' :src='product.image' style='height: 50px')
          td {{ product.name }}
          td {{ product.price }}
          td {{ product.category }}
          td {{ product.description }}
          td
            h1 {{ product.sell ? 'v' : '' }}
          td {{ product._id }}
</template>

<script>
export default {
  data () {
    return {
      theads: ['圖片', '名稱', '價格', '分類', '說明', '上架', '操作'],
      products: [],
      modalSubmitting: false,
      dialog: false,
      form: {
        name: '',
        price: null,
        description: '',
        image: null,
        sell: null,
        category: null,
        _id: ''
      },
      valid: true,
      pnameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      priceRules: [
        v => !!v || 'Price is required',
        v => (v && v.length <= 10) || 'Price must be less than 10 characters',
        v => v >= 0 || '價格不能小於 0'
      ],
      items: [
        { text: '請選擇分類', value: null },
        '登山健行',
        '滑雪',
        '外套',
        '露營'
      ]
    }
  },
  computed: {
    isEdit () {
      return this.form._id.length ? '編輯商品' : '新增商品'
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
      // this.$refs.form.validate() ? this.dialog = false : this.dialog = true
    },
    reset () {
      this.$refs.form.reset()
      this.form = {
        image: null,
        category: null,
        _id: ''
      }
    },
    async submitModal () {
      this.modalSubmitting = true
      const fd = new FormData()
      for (const key in this.form) {
        if (key !== '_id') {
          fd.append(key, this.form[key])
        }
        console.log(key)
        console.log(this.form)
        console.log(this.form[key])
        console.log(fd)
      }
      try {
        const { data } = await this.api.post('/products', fd, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        console.log(data)
        this.products.push(data.result)
        this.dialog = false
        this.reset()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
      this.modalSubmitting = false
    },
    resetForm (event) {
      // 上傳送出會有延遲，所以避免送出後使用者狂按送出上傳好幾次，要在送出後停掉
      // 但這裡 preventDefault 沒有作用 QQ
      if (this.modalSubmitting) {
        event.preventDefault()
        return
      }
      this.dialog = false
      this.form = {
        name: '',
        price: null,
        description: '',
        image: null,
        sell: false,
        category: null,
        _id: ''
      }
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/products/all', {
        headers: {
          authorization: 'Bearer ' + 'this.user.token'
        }
      })
      this.products = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  }
}
</script>
