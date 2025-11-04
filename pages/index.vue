<template>
  <Search :error="error" />
</template>

<script setup lang="ts">
import { computed } from "vue";

const route = useRoute();
const error = computed(() => !!route.query.error);
</script>
