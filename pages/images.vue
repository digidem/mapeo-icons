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
        <h1 class="text-2xl">{{ $t("select-icon") }}</h1>
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
        <p v-if="loadingMoreError" class="text-red-500 py-4 text-center">
          {{ $t("loadingMoreError") }}!
        </p>
        <div
          class="flex flex-col text-gray-800 md:border-t md:border-dashed fixed right-2 left-2 md:static bottom-4 md:bottom-0 md:flex-row md:justify-around items-center"
        >
          <NuxtLink v-if="loadingMoreError" :to="localePath('/')">
            <button
              class="w-250px uppercase bg-yellow-400 py-4 px-8 rounded-xl"
            >
              {{ $t("search-again") }}
            </button>
          </NuxtLink>
          <button
            v-else
            :disabled="loadingMore"
            class="w-250px uppercase bg-gray-900 py-4 px-8 rounded-xl text-white"
            @click="loadMore"
          >
            {{ $t(loadingMore ? "loading" : "load-more") }}
          </button>
          <div class="flex justify-center py-4">
            <client-only>
              <ColorPicker :color="color.hex" @changeColor="updateColor" />
            </client-only>
          </div>
          <button
            :disabled="loading || !active"
            class="w-250px uppercase bg-green-400 py-4 px-8 rounded-xl"
            @click="handleGenerate"
          >
            {{ $t(loading ? "loading" : "generate") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import colorize from "@/libs/colorize";

// Lazy load ColorPicker for client-only rendering
const ColorPicker = defineAsyncComponent(
  () =>
    // @ts-ignore - vue-colorpicker doesn't have proper types
    import("@caohenghu/vue-colorpicker"),
);

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

const s = (route.query.s as string) || "";
const l = (route.query.l as string) || "en";
const search = ref(s); // Define search variable

const { data: imagesData, error: fetchError } = await useFetch(
  `/api/search?s=${s}&l=${l}`,
);
const images = ref<string[]>(
  Array.isArray(imagesData.value) ? imagesData.value : [],
);

const active = ref<string | null>(null);
const loading = ref(false);
const loadingMore = ref(false);
const loadingMoreError = ref(false);
const pagination = ref(1);
const color = ref({
  hex: "#194d33",
  rgba: { r: 25, g: 77, b: 51, a: 1 },
  hsv: { h: 146, s: 68, v: 30 },
});

const colorized = computed(() => colorize(color.value?.hex));

onMounted(() => {
  if (fetchError.value) {
    let error = "error=true";
    router.push(localePath(`/?${error}`));
  } else if (Array.isArray(images.value) && images.value.length > 0) {
    active.value = images.value[0];
  }
});

const updateColor = (newColor: any) => {
  color.value = newColor;
};

const handleGenerate = () => {
  if (!active.value) return;
  loading.value = true;
  router.push(
    localePath(
      `/result?image=${active.value}&color=${
        color.value.hex.split("#")[1]
      }&search=${search.value}`,
    ),
  );
};

const loadMore = async () => {
  loadingMore.value = true;
  pagination.value = pagination.value + 1;
  try {
    const response = await $fetch(
      `/api/search?s=${s}&l=${l}&p=${pagination.value}`,
    );
    if (Array.isArray(images.value) && Array.isArray(response)) {
      images.value = [...images.value, ...response];
    }
    loadingMore.value = false;
  } catch (err) {
    loadingMore.value = false;
    loadingMoreError.value = true;
  }
};
</script>
