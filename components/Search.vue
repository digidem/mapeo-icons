<template>
  <div
    class="relative flex items-top justify-center min-h-screen bg-gray-200 sm:items-center sm:pt-0"
  >
    <div class="max-w-4xl mx-auto pt-8 md:pt-0 sm:px-6 lg:px-8">
      <div class="max-w-lg mx-auto sm:px-1 lg:px-2 mb-5">
        <img class="mx-auto h-100px md:h-150px" src="/logo.webp" />
      </div>
      <div class="bg-light-100 overflow-hidden shadow sm:rounded-lg p-6">
        <h1 class="text-center font-bold text-xl md:text-2xl py-4">
          {{ $t("title") }}
        </h1>
        <div class="md:px-12 text-md md:text-lg mx-auto">
          <p class="mb-5">{{ $t("description") }}</p>
          <p class="mb-5">
            {{ $t("config") }}
            <a
              href="https://docs.mapeo.app/complete-reference-guide/customization-options/custom-configurations/creating-custom-configurations"
              target="_blank"
              class="underline"
              >{{ $t("link") }}</a
            >
          </p>
        </div>
      </div>
      <div class="mt-8 bg-light-50 overflow-hidden shadow sm:rounded-lg p-6">
        <div class="flex flex-row justify-around">
          <h2 class="text-2xl leading-7 font-semibold">
            {{ $t("select-language") }}
          </h2>
          <select
            v-model="locale"
            class="px-2 md:px-4 py-1 md:py-2"
            @change="changeLocale"
          >
            <option
              v-for="availableLocale in availableLocales"
              :key="availableLocale.code"
              :value="availableLocale.code"
            >
              {{ availableLocale.name }}
            </option>
          </select>
        </div>
        <div class="border-t border-dashed mt-4 pt-4">
          <p class="pb-8 text-center">{{ $t("enter-search") }}</p>
          <form
            class="text-gray-800 flex flex-col md:flex-row flex-nowrap md:justify-between items-center"
            @submit.prevent="handleSearch"
          >
            <input
              v-model="term"
              class="w-full md:w-3/4 border-solid border-[1px] rounded-lg md:rounded-none md:rounded-l-lg border-red-300 py-4 pl-4"
              type="text"
              aria-label="term"
              :placeholder="$t('enter-search')"
              @input="updateSearchInput"
            />
            <button
              type="submit"
              :disabled="loading"
              class="w-full md:w-250px uppercase bg-green-400 text-gray-700 py-4 px-8 mt-4 md:mt-0 rounded-xl md:rounded-none md:rounded-r-lg"
            >
              {{ $t(loading ? "loading" : "search") }}
            </button>
          </form>
          <p v-if="error" class="text-red-500">{{ $t("error") }}!</p>
          <p v-if="emptySearchError" class="text-red-500">
            {{ $t("empty-search-error") }}!
          </p>
        </div>
      </div>
      <footer />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick, computed } from "vue";

defineProps({
  error: {
    type: Boolean,
    default: false,
  },
});

const i18n = useI18n();
const router = useRouter();
const localePath = useLocalePath();

const locale = ref(i18n.locale.value || "en");
const term = ref("");
const loading = ref(false);
const emptySearchError = ref(false);

const availableLocales = computed(() => {
  const locales = i18n.locales.value;
  if (!Array.isArray(locales)) {
    return [] as Array<{ code: string; name: string }>;
  }

  return locales.map((localeConfig) => ({
    code: localeConfig.code,
    name:
      "name" in localeConfig && typeof localeConfig.name === "string"
        ? localeConfig.name
        : localeConfig.code,
  }));
});

const prefetchedIcons = useState<string[]>("prefetchedIcons", () => []);
const prefetchedSearchTerm = useState<string>("prefetchedSearchTerm", () => "");
const prefetchedLocale = useState<string>("prefetchedLocale", () => "en");
const prefetchedPage = useState<number>("prefetchedPage", () => 0);

const handleSearch = async () => {
  if (!term.value.trim()) {
    emptySearchError.value = true;
    return;
  }
  emptySearchError.value = false;
  loading.value = true;

  try {
    const query = new URLSearchParams({
      s: term.value,
      l: locale.value,
      p: "1",
    }).toString();

    const response = await $fetch(`/api/search?${query}`);

    if (Array.isArray(response)) {
      prefetchedIcons.value = response;
    } else {
      prefetchedIcons.value = [];
    }

    prefetchedSearchTerm.value = term.value;
    prefetchedLocale.value = locale.value;
    prefetchedPage.value = 1;

    const imagesPath = localePath({
      path: "/images",
      query: {
        s: term.value,
        l: locale.value,
      },
    });

    router.push(imagesPath);
  } catch (err) {
    console.error("handleSearch: prefetch failed", err);
    router.push(
      localePath({
        path: "/",
        query: { error: "true" },
      }),
    );
  } finally {
    loading.value = false;
  }
};

const changeLocale = async () => {
  await i18n.setLocale(locale.value);
  await nextTick();
  emptySearchError.value = false;
};

const updateSearchInput = () => {
  if (term.value.trim()) {
    emptySearchError.value = false;
  }
};

onMounted(() => {
  prefetchedIcons.value = [];
  prefetchedSearchTerm.value = "";
  prefetchedPage.value = 0;
  prefetchedLocale.value = locale.value;
});
</script>
