<template lang="pug">
v-card.card-product
  v-img(:src="product.image" height="250")
  v-card-title
    router-link(:to='"/product/" + product._id') {{ product.name }}
  v-card-subtitle {{ product.category }} - {{ '$ ' + product.price }}
  v-card-text(style='white-space: pre;') {{ product.description }}
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>
