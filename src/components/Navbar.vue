<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
import { cn } from '../lib/utils';
import { useTheme } from '../lib/hooks';

const {theme, toggleTheme} = useTheme();
</script>

<template>
    <nav :class="cn('flex justify-between items-center w-full border-b border-b-default-200 dark:border-b-default-700 p-2')">
        <a href="/" class="flex justify-start gap-2 p-2 transition-colors hover:bg-default-300/50 dark:hover:bg-default-600 rounded-md w-fit">
            <img src="/icon.png" class="w-8" alt="Logo" />
            <h1 class="text-lg text-primary font-bold">Postrocket</h1>
        </a>
        <button title="Toggle Theme" @click="toggleTheme" :class="cn('hover:bg-default-300/50 dark:hover:bg-default-600 rounded-md p-2 transition-colors')">
            <SunIcon v-if="theme == 'dark'" class="size-6 text-foreground dark:text-background" />
            <MoonIcon v-if="theme == 'light'" class="size-6 text-foreground dark:text-background" />
        </button>
    </nav>
</template>