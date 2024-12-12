<script setup>
import { computed } from 'vue'
import BaseImage from '@/components/base/BaseImage.vue'

const cafeImage = computed(() => {
  const images = ['potato', 'seafood', 'johnsfavorite', 'avocado']
  const randomIndex = Math.floor(Math.random() * images.length)

  return `/images/${images[randomIndex]}.jpg`
})
</script>

<template>
  <BaseImage :src="cafeImage" cover height="150" />
</template>

<style></style>
