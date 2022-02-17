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
    v-container#header-container.xl-mw.pa-0.d-flex.align-center
      router-link.mr-12(
        to='/'
      )
        v-img(
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
          :to='btn.to'
        )
          v-icon.mr-1(color) {{ btn.icon }}
          p.mb-0.font-weight-light {{ btn.text }}
    v-divider.divider
  .w-100
    v-container#menu-container.pa-0
      div
        v-tabs(
          color='maincolor'
          slider-color="maincolor"
          v-model='active_tab'
          show-arrows
        )
          //- v-tabs-slider(color="maincolor")
          v-tab.px-0.self-tab-item(
            v-for='tab in tabs'
            :key='tab.id'
            :to='tab.to'
            active-class='menu-tab-text'
            exact-active-class=''
          )
            span {{ tab.title }}
            v-divider(inset vertical)
</template>

<script>
export default {
  data () {
    return {
      btns: [
        { icon: 'mdi-account-outline', text: '登入/註冊', to: '/register' },
        { icon: 'mdi-cart-outline', text: '購物車(0)', to: '/cart' }
      ],
      // 頁面預選單個 tab
      active_tab: 0,
      tabs: [
        { id: 1, title: '首頁', to: '/' },
        { id: 2, title: '登山健行', to: '/shop/hiking' },
        { id: 3, title: '滑雪', to: '/shop/ski' },
        { id: 4, title: '外套', to: '/shop/coat' },
        { id: 5, title: '男生', to: '/shop/male' },
        { id: 6, title: '女生', to: '/shop/female' },
        { id: 7, title: '露營', to: '/shop/camping' }
      ]
    }
  },
  mounted () {

  }
}
</script>
