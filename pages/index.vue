<template>
  <Search :error="error" />
</template>

<script setup lang="ts">
const route = useRoute();
const error = computed(() => !!route.query.error);
</script>
