<template>
  <Search :error="error" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  asyncData({ query }) {
    const { error } = query
    return { error }
  },
})
</script>
