<script setup lang="ts">
import { variantsType } from '../../types';
import { cn } from '../../lib/utils';
import Spinner from './Spinner.vue';

interface Props {
    variant: variantsType;
    loading?: boolean;
}

const { variant, loading = false } = defineProps<Props>();
const className = [
    "text-background transition-all font-bold rounded px-4 py-2 text-sm focus:ring rounded-md ring-offset-2 ring-offset-background dark:ring-offset-foreground flex justify-center items-center gap-2",
    variant == "primary" ? "bg-primary hover:bg-primary-600 ring-primary disabled:bg-primary-600"
        : variant == "secondary" ? "bg-secondary hover:bg-secondary-600 ring-secondary disabled:bg-secondary-700"
            : variant == "default" ? "bg-default-600 hover:bg-default-700 ring-default disabled:bg-default-800"
                : variant == "danger" ? "bg-danger hover:bg-danger-600 ring-danger disabled:bg-danger-700"
                    : variant == "success" ? "bg-success hover:bg-success-600 ring-success disabled:bg-success-700"
                        : variant == "warning" ? "bg-warning hover:bg-warning-600 ring-warning disabled:bg-warning-700" : ""];
</script>

<template>
    <button type="button" :class="cn(className, loading == true ? 'animate-pulse' : '')" :disabled="loading">
        <slot v-if="!loading"></slot>
        <Spinner v-if="loading" />
        <span v-if="loading">Loading...</span>
    </button>
</template>