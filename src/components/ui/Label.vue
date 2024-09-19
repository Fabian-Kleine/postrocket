<script setup lang="ts">
import { cn } from '../../lib/utils';
</script>

<template>
    <label :class="cn('inline-flex justify-center items-center gap-2 mr-4 cursor-pointer')">
        <slot></slot>
    </label>
</template>