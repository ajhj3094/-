<template lang="pug">
#recommend
  h2.ct-font.text-center 推薦商品
  v-container.d-flex.justify-center.align-center.mt-9
    v-card(
      width='320'
      hover
      height='450'
    )
      v-img(
        src='https://picsum.photos/200/350'
        height='450'
      )
      v-card-title.justify-center aoifhosaidgh
    div.mx-8.d-flex.flex-wrap.rec-wrap.justify-space-around
      v-card.align-content-space-between(
      v-for='n in 4'
      width='220'
      hover
      height='220'
    )
        v-img(
          src='https://picsum.photos/220/220'
          height='220'
        )
        v-card-title.justify-center aoifhosaidgh
    v-card(
      width='320'
      hover
      height='450'
    )
      v-img(
        src='https://picsum.photos/200/350'
        height='450'
      )
      v-card-title.justify-center aoifhosaidgh
</template>
