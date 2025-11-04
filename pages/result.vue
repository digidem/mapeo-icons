<template>
  <div
    class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
  >
    <div class="max-w-8xl mx-auto sm:px-6 lg:px-8">
      <div class="flex items-center justify-center pt-8 sm:pt-0 relative">
        <NuxtLink
          :to="localePath(`/images?s=${search}&l=${i18n.locale.value}`)"
          class="absolute left-0 flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
          aria-label="Go back to icon selection"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span class="ml-1 text-sm md:text-base hidden sm:inline">{{
            $t("back")
          }}</span>
        </NuxtLink>
      </div>
      <div
        class="flex flex-col items-center mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6 text-center"
      >
        <p>{{ $t("enter-icon-name") }}</p>
        <input
          v-model="name"
          class="border-solid border-[1px] rounded-lg border-red-300 py-4 pl-4 mb-12 mt-4"
          type="text"
          aria-label="term"
        />
        <div class="mt-4 pt-4 mb-12 text-gray-800 border-t border-dashed">
          <p class="md:px-12">
            {{ $t("save-images") }}
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
        <button
          type="button"
          :class="`${
            copied ? 'bg-blue-400' : 'bg-green-400'
          } px-4 py-2 flex items-center`"
          @click="copyURL"
        >
          <span class="pr-4">#{{ color }}</span>
          <svg
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              d="M11 1.5h2.5v12a1 1 0 01-1 1h-10a1 1 0 01-1-1v-12H4m.5-1h6v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z"
              stroke="currentColor"
            ></path>
          </svg>
        </button>
        <div class="mt-4 pt-4 text-gray-800 border-t border-dashed">
          <NuxtLink :to="localePath(`/`)">
            <button class="uppercase bg-yellow-400 py-4 px-8 mt-4 rounded-xl">
              {{ $t("search-again") }}
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const route = useRoute();
const i18n = useI18n();
const localePath = useLocalePath();

const image = ref("");
const imageUrl = (route.query.image as string) || "";
const color = ref((route.query.color as string) || "");
const search = ref((route.query.search as string) || "");
const name = ref(i18n.t("name") as string);
const copied = ref(false);

const { data: generatedData } = await useFetch(
  `/api/generate?image=${imageUrl}&color=${color.value}`,
);

onMounted(() => {
  if (generatedData.value && Array.isArray(generatedData.value)) {
    image.value = generatedData.value[0].svg;
  }
  name.value = search.value || (i18n.t("name") as string);
});

const copyURL = async () => {
  copied.value = true;
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`#${color.value}`);
    }
  } catch (err) {
    console.error("Failed to copy:", err);
  }
  setTimeout(() => {
    copied.value = false;
  }, 3000);
};
</script>
