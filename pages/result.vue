<template>
  <div
    class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
  >
    <div class="max-w-8xl mx-auto sm:px-6 lg:px-8">
      <div
        class="flex flex-col items-center mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 text-center"
      >
        <p>{{ $t('enter-icon-name') }}</p>
        <input
          v-model="name"
          class="border-solid border-1px rounded-lg border-red-300 pl-4 mb-12 mt-4"
          type="text"
          aria-label="term"
        />
        <div class="mt-4 pt-4 mb-12 text-gray-800 border-t border-dashed">
          <p>
            {{ $t('save-images') }}
          </p>
        </div>
        <div>
          <a
            :download="`${name}-100px.svg`"
            :href="image"
            target="_blank"
            class="flex flex-col items-center"
          >
            <img :src="image" :alt="name" height="100" width="100" />
            <p class="pb-12">{{ `${name}-100px.svg` }}</p>
          </a>
          <a
            :download="`${name}-24px.svg`"
            :href="image"
            target="_blank"
            class="flex flex-col items-center"
          >
            <img :src="image" :alt="name" height="24" width="24" />
            <p class="pb-12">{{ `${name}-24px.svg` }}</p>
          </a>
        </div>
        <div class="mt-4 pt-4 text-gray-800 border-t border-dashed">
          <NuxtLink :to="localePath(`/`)">
            <button class="uppercase bg-green-400 py-4 px-8 mt-4 rounded-xl">
              {{ $t('search-again') }}
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ResultPage',
  async asyncData({ app, query }) {
    const { image, color, search } = query
    const response = await app.$axios.$get(
      `/api/generate?image=${image}&color=${color}`
    )
    return { image: response[0].svg, search }
  },
  data() {
    return {
      name: this.$t('name'),
    }
  },
  mounted() {
    this.name = this.search
  },
})
</script>
