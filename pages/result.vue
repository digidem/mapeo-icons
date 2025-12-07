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
          <p
            class="md:px-12 max-w-prose md:max-w-2xl mx-auto leading-relaxed text-center"
          >
            {{ $t("save-images") }}
          </p>
        </div>
        <div>
          <a
            :download="`${name}.svg`"
            :href="image"
            target="_blank"
            class="flex flex-col items-center"
          >
            <img :src="image" :alt="name" height="100" width="100" />
            <p class="pb-12">{{ `${name}.svg` }}</p>
          </a>
        </div>
        <button
          type="button"
          class="bg-blue-500 text-white px-4 py-2 flex items-center justify-center gap-2 mb-3 w-48 sm:w-56 whitespace-nowrap"
          :disabled="!image"
          @click="copySvg"
        >
          <span class="pr-4">{{
            copiedSvg ? $t("copied") : $t("copy-svg")
          }}</span>
          <svg
            v-if="!copiedSvg"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              d="M10.5 1.5h-6a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1v-10a1 1 0 00-1-1z"
              stroke="currentColor"
            ></path>
            <path
              d="M5 4h5M5 7h5M5 10h3"
              stroke="currentColor"
              stroke-linecap="round"
            ></path>
          </svg>
          <svg
            v-else
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              d="M16.667 5.833l-7.5 7.5-3.334-3.333"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          :class="[
            'px-4 py-2 flex items-center justify-center gap-2 w-48 sm:w-56 whitespace-nowrap',
            colorTextClass,
            copied ? 'ring-2 ring-offset-1 ring-blue-300' : '',
          ]"
          :style="{ backgroundColor: colorHex }"
          @click="copyURL"
        >
          <span class="pr-4">{{ copied ? $t("copied") : colorHex }}</span>
          <svg
            v-if="!copied"
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
          <svg
            v-else
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path
              d="M16.667 5.833l-7.5 7.5-3.334-3.333"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
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
import { ref, onMounted, computed } from "vue";

const route = useRoute();
const i18n = useI18n();
const localePath = useLocalePath();

const image = ref("");
const imageUrl = (route.query.image as string) || "";
const color = ref((route.query.color as string) || "");
const search = ref((route.query.search as string) || "");
const name = ref(i18n.t("name") as string);
const copied = ref(false);
const copiedSvg = ref(false);

const colorHex = computed(() => {
  const value = color.value || "#000000";
  return value.startsWith("#") ? value : `#${value}`;
});

const hexToRgb = (hex: string) => {
  const normalized = hex.replace("#", "");
  if (![3, 6].includes(normalized.length)) return { r: 0, g: 0, b: 0 };

  const chunk =
    normalized.length === 3
      ? normalized.split("").map((c) => c + c)
      : (normalized.match(/.{1,2}/g) ?? ["00", "00", "00"]);

  const [r, g, b] = chunk.map((c) => parseInt(c, 16));
  return { r, g, b };
};

const getContrastTextClass = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  // YIQ formula for perceived brightness; threshold ~128 for good legibility.
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "text-black" : "text-white";
};

const colorTextClass = computed(() => getContrastTextClass(colorHex.value));

const { data: generatedData } = await useFetch(
  `/api/generate?image=${imageUrl}&color=${color.value}`,
);

onMounted(() => {
  if (generatedData.value && Array.isArray(generatedData.value)) {
    image.value = generatedData.value[0].svg;
  }
  name.value = search.value || (i18n.t("name") as string);
});

const decodeSvgFromDataUri = (value: string) => {
  const dataUriPrefix = /^data:image\/svg\+xml(?:;charset=utf-8)?,/i;
  if (dataUriPrefix.test(value)) {
    const encoded = value.replace(dataUriPrefix, "");
    try {
      return decodeURIComponent(encoded);
    } catch (err) {
      console.error("Failed to decode SVG data URI:", err);
      return value;
    }
  }

  return value;
};

const copySvg = async () => {
  if (!image.value) return;

  try {
    const svgContent = decodeSvgFromDataUri(image.value);
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(svgContent);
      copiedSvg.value = true;
    }
  } catch (err) {
    console.error("Failed to copy SVG:", err);
  }

  setTimeout(() => {
    copiedSvg.value = false;
  }, 3000);
};

const copyURL = async () => {
  copied.value = true;
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(colorHex.value);
    }
  } catch (err) {
    console.error("Failed to copy:", err);
  }
  setTimeout(() => {
    copied.value = false;
  }, 3000);
};
</script>
