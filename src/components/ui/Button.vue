<script setup>

    const props = defineProps(['children']);
</script>

<template>
    <button type="button" class="bg-primary text-background transition-colors font-bold rounded px-3 text-sm hover:bg-primary-600">{{ children }}</button>
</template>