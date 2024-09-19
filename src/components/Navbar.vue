<script setup lang="ts">
import { ref, Ref } from 'vue';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
import { cn } from '../lib/utils';

const body = document.querySelector('body');

const defaultIsDarkMode:boolean = JSON.parse(localStorage.getItem('isDarkMode') || 'false');

if (defaultIsDarkMode && body) {
    body.className = "dark";
}

const isDarkMode:Ref<boolean, boolean> = ref(defaultIsDarkMode);

function toggleMode() {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode.value));
    if (!body) return;
    if (isDarkMode.value) {
        body.className = "dark";
    } else {
        body.className = "light";
    }
}
</script>

<template>
    <nav :class="cn('flex justify-between items-center w-screen border-b border-b-default-200 dark:border-b-default-700 p-2')">
        <a href="/" class="flex justify-start gap-2 p-2 transition-colors hover:bg-default-300/50 dark:hover:bg-default-600 rounded-md w-fit">
            <img src="/icon.png" class="w-8" alt="Logo" />
            <h1 class="text-lg text-primary font-bold">Postrocket</h1>
        </a>
        <button title="Toggle Theme" @click="toggleMode" :class="cn('hover:bg-default-300/50 dark:hover:bg-default-600 rounded-md p-2 transition-colors')">
            <SunIcon v-if="isDarkMode" class="size-6 text-foreground dark:text-background" />
            <MoonIcon v-if="!isDarkMode" class="size-6 text-foreground dark:text-background" />
        </button>
    </nav>
</template>