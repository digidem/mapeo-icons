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
        <h1 class="text-2xl">{{ $t('select-icon') }}</h1>
      </a>
      <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <div class="flex flex-row flex-wrap">
          <div
            v-for="image in images"
            :key="image"
            :class="`p-25px cursor-pointer border-red-500 border-solid rounded ${
              active === image ? `border-2` : 'border-0'
            }`"
            :style="colorized"
            @click="active = image"
          >
            <img width="100" :src="image" />
          </div>
        </div>
        <div class="mt-4 pt-4 text-gray-800 border-t border-dashed">
          <div class="flex justify-center">
            <client-only>
              <chrome-picker v-model="color" />
            </client-only>
          </div>
          <NuxtLink
            :to="
              localePath(
                `/result?image=${active}&color=${
                  color.hex.split('#')[1]
                }&search=${search}`
              )
            "
          >
            <button
              :disabled="loading"
              class="uppercase bg-green-400 py-4 px-8 mt-4 rounded-xl"
              @click="loading = true"
            >
              {{ $t(loading ? 'loading' : 'generate') }}
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Chrome } from 'vue-color'
import colorize from '@/libs/colorize'

export default Vue.extend({
  name: 'ImagesPage',
  components: {
    'chrome-picker': Chrome,
  },
  async asyncData({ app, query }) {
    const { s, l } = query
    try {
      const response = await app.$axios.$get(`/api/search?s=${s}&l=${l}`)
      return { images: response, search: s }
    } catch (err) {
      return { err, images: null, search: s }
    }
  },
  data() {
    return {
      active: null,
      loading: false,
      color: {
        hex: '#194d33',
      },
    }
  },
  computed: {
    colorized() {
      return colorize(this.color?.hex)
    },
  },
  mounted() {
    if (this.err) {
      let error = 'error=true'
      if (this.err.code === 'ECONNREFUSED') error = ''
      this.$router.push(this.localePath(`/?${error}`))
    } else if (this.images?.length > 0) this.active = this.images[0]
  },
})
</script>
