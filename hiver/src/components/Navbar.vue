<template lang="pug">
v-app-bar#navbar(
    app
    prominent
  )
  .w-100.sd-color
    v-container.xl-mw.navtext-container.pa-0
      p.mb-0.text-subtitle-2.white--text
        | 超取$199 免運費，宅配$499 免運費(大型商品除外)。滿千送百活動獲得的購物抵用卡開始使用囉！
  .w-100
    v-container.xl-mw.header-container.pa-0.d-flex
      v-img.mr-12(
        :src="require('../assets/logo.png')"
        contain
        max-width='125'
      )
      v-text-field.flex-grow-0.align-center.mr-auto(
        dense
        outlined
        color='#000000'
      )
        template(v-slot:append)
          v-btn(icon)
            v-icon mdi-magnify
      .d-flex.align-center
        v-btn.ml-3(v-for='btn in btns')
          v-icon.mr-1(color) {{ btn.icon }}
          p.mb-0.font-weight-light {{ btn.text }}
</template>

<script>
export default {
  data () {
    return {
      btns: [
        { icon: 'mdi-account-outline', text: '登入/註冊' },
        { icon: 'mdi-cart-outline', text: '購物車' }
      ]
    }
  }
}
</script>
