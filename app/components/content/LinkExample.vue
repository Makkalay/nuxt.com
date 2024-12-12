<template>
  <Callout icon="i-ph-app-window">
    Citiți și editați un exemplu live în
    <NuxtLink :to="to">
      {{ computedTitle }}
    </NuxtLink>.
  </Callout>
</template>

<script setup lang="ts">
import type { ComputedRef } from 'vue'

const props = defineProps({
  to: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false,
    default: ''
  }
})

const computedTitle: ComputedRef<string> = computed(() => createBreadcrumb(props.to))
</script>
