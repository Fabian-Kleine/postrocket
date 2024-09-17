<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1 class="bg-sky-800 text-white text-center text-lg font-bold">{{ msg }}</h1>
</template>