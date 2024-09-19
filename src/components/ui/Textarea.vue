<script setup lang="ts">
import { cn } from '../../lib/utils';
</script>

<template>
    <textarea rows="10"
        :class="cn('block w-full overflow-visible mt-4 resize-none bg-background dark:bg-foreground border border-default-200 dark:border-default-700 rounded-md outline-none p-2')">
    </textarea>
</template>