<template lang="pug">
v-app-bar#navbar(
    app
    prominent
    height='164'
  )
  .w-100.sd-color
    v-container#navtext-container.xl-mw.pa-0
      p.mb-0.text-subtitle-2.white--text
        | 超取 $199 免運費，宅配 $499 免運費(大型商品除外)。滿千送百活動獲得的購物抵用卡開始使用囉！
  .w-100
    v-container#header-container.xl-mw.pa-0.d-flex
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
          v-btn(
            icon
          )
            v-icon mdi-magnify
      .d-flex.align-center
        v-btn.ml-3(
          v-for='btn in btns'
          depressed
        )
          v-icon.mr-1(color) {{ btn.icon }}
          p.mb-0.font-weight-light {{ btn.text }}
    v-container.pa-0
      v-divider.divider
  .w-100
    v-container#menu-container.pa-0
      div
        v-tabs
          v-tab.px-0(v-for='tab in tabs')
            span {{ tab.title }}
            v-divider(inset vertical)
  //- .w-100.test-color
  //-   v-container.xl-mw.menutext-container.pa-0
  //-     p.mb-0.text-subtitle-2.white--text.text-center
  //-       | 嗨！HIVER 的會員，聖誕節起首筆消費即享有 8 折優惠！活動將於 3/4 截止
</template>

<script>
export default {
  data () {
    return {
      btns: [
        { icon: 'mdi-account-outline', text: '登入/註冊' },
        { icon: 'mdi-cart-outline', text: '購物車(0)' }
      ],
      tabs: [
        { title: '露營', to: '' },
        { title: '登山健行', to: '' },
        { title: '滑雪', to: '' },
        { title: '外套', to: '' },
        { title: '男生', to: '' },
        { title: '女生', to: '' }
      ]
    }
  }
}
</script>
