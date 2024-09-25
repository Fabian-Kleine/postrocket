<script setup lang="ts">
import { variantsType } from '../../types';
import { cn } from '../../lib/utils';

interface Props {
    variant: variantsType;
}

const { variant } = defineProps<Props>();
const className = [
    "text-background transition-all font-bold rounded px-4 py-2 text-sm focus:ring rounded-md ring-offset-2 ring-offset-background dark:ring-offset-foreground",
    variant == "primary" ? "bg-primary hover:bg-primary-600 ring-primary"
        : variant == "secondary" ? "bg-secondary hover:bg-secondary-600 ring-secondary"
            : variant == "default" ? "bg-default-600 hover:bg-default-700 ring-default"
                : variant == "danger" ? "bg-danger hover:bg-danger-600 ring-danger"
                    : variant == "success" ? "bg-success hover:bg-success-600 ring-success"
                        : variant == "warning" ? "bg-warning hover:bg-warning-600 ring-warning" : ""];
</script>

<template>
    <button type="button" :class="cn(className)">
        <slot></slot>
    </button>
</template>