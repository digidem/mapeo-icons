<!-- Please remove this file from your project -->
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
        <div class="text-white">
          <img src="https://www.earthdefenderstoolkit.com/wp-content/uploads/2020/12/EDT-asset-light-logo.png"></img>
        </div>
      </a>
      <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <div class="flex flex-row">
          <h2 class="text-2xl leading-7 font-semibold">{{ $t('welcome') }}</h2>
          <select v-model="locale" class="ml-8" @change="changeLocale">
            <option value="pt">Português</option>
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
        <form class="mt-4 pt-4 text-gray-800 border-t border-dashed">
          <p>{{ $t('enter-search') }}</p>
          <input
            v-model="term"
            class="border-solid border-1px rounded-lg border-red-300 py-4 pl-4"
            type="text"
            aria-label="term"
          />
          <NuxtLink :to="localePath(`/images?s=${term}&l=${locale}`)">
            <button
              :disabled="loading"
              class="uppercase bg-green-400 py-4 px-8 mt-4 rounded-xl"
              @click="loading = true"
            >
              {{ $t(loading ? 'loading' : 'search') }}
            </button>
          </NuxtLink>
          <p v-if="error" class="text-red-500">{{ $t('error') }}!</p>
        </form>
      </div>
      <footer />
    </div>
  </div>
</template>
<script>
export default {
  name: 'NuxtTutorial',
  props: {
    error: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      locale: this.$i18n.getLocaleCookie() || this.$i18n.defaultLocale,
      term: '',
      loading: false,
    }
  },
  methods: {
    changeLocale() {
      this.$router.push(this.switchLocalePath(this.locale))
    },
  },
}
</script>
