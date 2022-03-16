<template>
  <div
    class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
  >
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <a
        class="flex justify-center pt-8 sm:pt-0"
        href="https://mapeo.app"
        target="_blank"
      >
        <!-- LOGO HERE -->
      </a>
      <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <div class="flex flex-row">
          <div
            v-for="image in images"
            :key="image.id"
            class="p-25px cursor-pointer bg-green-300"
          >
            <img class="mh-25px" :src="image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ImagesPage',
  async asyncData({ app, query }) {
    const response = await app.$axios.$get(`/api/search?s=${query?.s}`)
    console.log(
      '🚀 ~ file: images.vue ~ line 19 ~ asyncData ~ response',
      response
    )
    return { images: response }
  },
})
</script>
