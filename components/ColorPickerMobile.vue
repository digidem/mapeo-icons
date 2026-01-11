<template>
  <div class="color-picker-wrapper">
    <!-- Mobile: Show color swatch button that toggles the picker -->
    <div class="md:hidden">
      <button
        type="button"
        class="flex items-center gap-2 px-4 py-3 bg-gray-800 rounded-xl text-white"
        :aria-label="$t('color')"
        @click="togglePicker"
      >
        <span
          class="w-6 h-6 rounded border-2 border-white"
          :style="{ backgroundColor: modelValue }"
        />
        <span class="uppercase text-sm">{{ $t("color") }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 transition-transform"
          :class="{ 'rotate-180': isOpen }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- Mobile picker overlay -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition-opacity duration-200"
          leave-active-class="transition-opacity duration-200"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div
            v-if="isOpen"
            role="dialog"
            aria-modal="true"
            class="fixed inset-0 z-50 flex items-end justify-center"
            @keydown.escape="closePicker"
          >
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/50" @click="closePicker" />
            <!-- Picker container -->
            <Transition
              enter-active-class="transition-transform duration-300 ease-out"
              leave-active-class="transition-transform duration-200 ease-in"
              enter-from-class="translate-y-full"
              leave-to-class="translate-y-full"
              appear
            >
              <div
                v-if="isOpen"
                class="relative bg-gray-900 rounded-t-2xl p-4 pb-8 w-full max-w-md"
                @click.stop
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-white text-lg font-medium">
                    {{ $t("select-color") }}
                  </h3>
                  <button
                    ref="closeButtonRef"
                    type="button"
                    class="text-white p-2"
                    :aria-label="$t('close')"
                    @click="closePicker"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div class="flex justify-center">
                  <client-only>
                    <ColorPicker
                      :color="modelValue"
                      @changeColor="handleColorChange"
                    />
                  </client-only>
                </div>
                <button
                  type="button"
                  class="w-full mt-4 py-3 bg-green-400 rounded-xl text-gray-800 font-medium uppercase"
                  @click="closePicker"
                >
                  {{ $t("done") }}
                </button>
              </div>
            </Transition>
          </div>
        </Transition>
      </Teleport>
    </div>

    <!-- Desktop: Show picker inline -->
    <div class="hidden md:flex justify-center py-4">
      <client-only>
        <ColorPicker :color="modelValue" @changeColor="handleColorChange" />
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
  defineAsyncComponent,
} from "vue";

// Lazy load ColorPicker for client-only rendering
const ColorPicker = defineAsyncComponent(
  () =>
    // @ts-ignore - vue-colorpicker doesn't have proper types
    import("@caohenghu/vue-colorpicker"),
);

type SelectedColor = {
  hex: string;
  rgba?: { r: number; g: number; b: number; a: number };
  hsv?: { h: number; s: number; v: number };
};

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", color: SelectedColor): void;
}>();

const isOpen = ref(false);
const closeButtonRef = ref<HTMLButtonElement | null>(null);

// Handle escape key globally when modal is open
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && isOpen.value) {
    closePicker();
  }
};

// Body scroll lock
const lockBodyScroll = () => {
  document.body.style.overflow = "hidden";
};

const unlockBodyScroll = () => {
  document.body.style.overflow = "";
};

watch(isOpen, async (newValue) => {
  if (newValue) {
    lockBodyScroll();
    // Focus the close button for accessibility
    await nextTick();
    closeButtonRef.value?.focus();
  } else {
    unlockBodyScroll();
  }
});

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  // Ensure scroll is unlocked if component unmounts while open
  unlockBodyScroll();
});

const togglePicker = () => {
  isOpen.value = !isOpen.value;
};

const closePicker = () => {
  isOpen.value = false;
};

const handleColorChange = (newColor: SelectedColor) => {
  emit("update:modelValue", newColor);
};
</script>
