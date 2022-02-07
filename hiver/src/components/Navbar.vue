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
      v-img.mr-8(
        :src="require('../assets/logo.png')"
        contain
        max-width='125'
      )
      v-text-field.flex-grow-0.align-center(
        clearable='true'
        dense
        @click:append='text++'
      )
        template(#append)
          v-btn(icon)
            v-icon mdi-magnify
</template>

<script>
export default {
  data () {
    return {
      text: 1
    }
  }
}
</script>
