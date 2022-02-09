<template lang="pug">
#Home
  .w-100.test-color.position-fixed.mt-n8.z-50
    v-container#menutext-container.xl-mw.pa-0
      p.mb-0.text-subtitle-2.white--text.text-center
        | 嗨！HIVER 的會員，聖誕節起首筆消費即享有 8 折優惠！活動將於 3/4 截止
  Carousel.mt-8
  Recommend.pt-10.pb-8
</template>

<script>
import Carousel from '../components/Carousel.vue'
import Recommend from '../components/Recommend.vue'

export default {
  name: 'Home',
  components: {
    Carousel,
    Recommend
  }
}
</script>
