<!-- Please remove this file from your project -->
<template>
  <div
    class="relative flex items-top justify-center min-h-screen bg-gray-200 sm:items-center sm:pt-0"
  >
    <div class="max-w-4xl mx-auto pt-5vh md:pt-0 sm:px-6 lg:px-8">
      <div class="max-w-lg mx-auto sm:px-1 lg:px-2 mb-5">
        <img class="mx-auto h-100px md:h-150px" src="/logo.webp" />
      </div>
      <div class="bg-light-400 overflow-hidden shadow sm:rounded-lg p-6">
        <h1 class="text-center font-bold text-xl md:text-2xl py-4">
          {{ $t('title') }}
        </h1>
        <div class="md:px-12 text-md md:text-lg mx-auto">
          <p class="mb-5">{{ $t('description') }}</p>
          <p class="mb-5">
            {{ $t('config') }}
            <a
              href="https://docs.mapeo.app/complete-reference-guide/customization-options/custom-configurations/creating-custom-configurations"
              target="_blank"
              class="underline"
              >{{ $t('link') }}</a
            >
          </p>
        </div>
      </div>
      <div class="mt-8 bg-light-50 overflow-hidden shadow sm:rounded-lg p-6">
        <div class="flex flex-row justify-around">
          <h2 class="text-2xl leading-7 font-semibold">
            {{ $t('select-language') }}
          </h2>
          <select
            v-model="locale"
            class="px-2 md:px-4 py-1 md:py-2"
            @change="changeLocale"
          >
            <option value="pt">Português</option>
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="nl">Nederlands</option>
          </select>
        </div>
        <div class="border-t border-dashed mt-4 pt-4">
          <p class="pb-8 text-center">{{ $t('enter-search') }}</p>
          <form
            class="text-gray-800 flex flex-col md:flex-row flex-nowrap md:justify-between"
          >
            <input
              v-model="term"
              class="w-100% md:w-3/4 border-solid border-1px rounded-lg md:rounded-none md:rounded-l-lg border-red-300 py-4 pl-4"
              type="text"
              aria-label="term"
            />
            <NuxtLink :to="localePath(`/images?s=${term}&l=${locale}`)">
              <button
                :disabled="loading"
                class="w-250px uppercase bg-green-400 text-gray-700 py-4 px-8 mt-4 md:mt-0 rounded-xl md:rounded-none md:rounded-r-lg"
                @click="loading = true"
              >
                {{ $t(loading ? 'loading' : 'search') }}
              </button>
            </NuxtLink>
          </form>
          <p v-if="error" class="text-red-500">{{ $t('error') }}!</p>
        </div>
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
