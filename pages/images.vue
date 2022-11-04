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
      <div
        class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 pb-500px md:pb-0"
      >
        <div class="flex flex-row flex-wrap justify-center">
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
        <div
          class="flex flex-col text-gray-800 md:border-t md:border-dashed fixed right-0.5 left-0.5 md:static bottom-4 md:bottom-0 md:flex-row md:justify-around items-center"
        >
          <button
            :disabled="loadingMore"
            class="uppercase bg-gray-900 py-4 px-8 rounded-xl text-light-700"
            @click="loadMore"
          >
            {{ $t(loadingMore ? 'loading' : 'load-more') }}
          </button>
          <div class="flex justify-center py-4">
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
              class="uppercase bg-green-400 py-4 px-8 rounded-xl"
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
      if (response.error) return { ...response }
      return { images: response, search: s, language: l }
    } catch (err) {
      console.error(err)
      return { err, images: null, search: s, language: l }
    }
  },
  data() {
    return {
      active: null,
      loading: false,
      loadingMore: false,
      pagination: 1,
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
    if (this.error) {
      const error = `error=${this.err.data}`
      console.log('this.err', this.err)
      this.$router.push(this.localePath(`/?${error}`))
    } else if (this.images?.length > 0) this.active = this.images[0]
  },
  methods: {
    async loadMore() {
      this.loadingMore = true
      this.pagination = this.pagination + 1
      try {
        const response = await this.$axios.$get(
          `/api/search?s=${this.search}&l=${this.language}&p=${this.pagination}`
        )
        this.images = [...this.images, ...response]
        this.loadingMore = false
      } catch (err) {
        console.log(err)
        this.loadingMore = false
      }
    },
  },
})
</script>
<style>
.vc-chrome-toggle-btn,
.vc-chrome-alpha-wrap {
  display: none;
}

.vc-chrome-controls {
  align-items: end !important;
}
</style>
