<script setup lang="ts">
interface Props {
    variant: "primary" | "secondary" | "default" | "warning" | "success" | "danger";
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
    <input type="radio" :class="className">
</template>