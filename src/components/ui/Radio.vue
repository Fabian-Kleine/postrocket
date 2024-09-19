<script setup lang="ts">
import { variantsType } from '../../types';
import { cn } from '../../lib/utils';

interface Props {
    variant: variantsType;
}

const { variant } = defineProps<Props>();
const className = [
    "bg-default px-4 text-sm size-4",
    variant == "primary" ? "accent-primary hover:accent-primary-600"
        : variant == "secondary" ? "bg-secondary hover:bg-secondary-600"
            : variant == "default" ? "bg-default-600 hover:bg-default-700"
                : variant == "danger" ? "bg-danger hover:bg-danger-600"
                    : variant == "success" ? "bg-success hover:bg-success-600"
                        : variant == "warning" ? "bg-warning hover:bg-warning-600" : ""];
</script>

<template>
    <input type="radio" :class="cn(className)">
</template>