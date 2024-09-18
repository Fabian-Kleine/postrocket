<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { Ref, ref } from 'vue';
import Button from './Button.vue';
import MainInput from './MainInput.vue';

const tabs = ref([
    {
        method: "POST",
        url: "http://localhost/shop/api/get_cart.php"
    },
    {
        method: "GET",
        url: "http://localhost/shop/api/add_to_cart.php"
    },
    {
        method: "GET",
        url: "http://localhost/shop/api/add_to_cart.php"
    },
]);

const activeTab: Ref<number, number> = ref(0);

function closeTab(i: number) {
    tabs.value.splice(i, 1);
    tabs.value = [...tabs.value];
    if (activeTab.value >= tabs.value.length) {
        activeTab.value = tabs.value.length - 1;
    } else if (activeTab.value == i) {
        activeTab.value = i > 0 ? i - 1 : 0;
    }
}

function openTab(i: number) {
    activeTab.value = i;
}
</script>

<template>
    <div class="flex justify-left border-b border-default-200 dark:border-default-700">
        <div class="flex justify-center items-center relative -bottom-[1px] group z-10"
            :class="activeTab == index ? 'bg-background dark:bg-foreground' : ''"
            v-for="(tab, index) in tabs" :title="tab.url">
            <div @click="openTab(index)"
                class="flex justify-left items-center gap-2 w-56 px-3 py-4 text-sm cursor-pointer border-default-200 dark:border-default-700"
                :class="activeTab == index ? 'border-l border-r' : ''">
                <div v-if="activeTab == index" class="absolute top-0 left-0 w-full bg-primary h-1"></div>
                <span
                    :class="['font-bold', tab.method == 'POST' ? 'text-warning' : '', tab.method == 'GET' ? 'text-success' : '']">{{
                        tab.method }}</span>
                <span
                    :class="['text-ellipsis', 'overflow-hidden', 'text-foreground', 'dark:text-default', activeTab != index ? 'italic' : '']">{{
                        tab.url }}</span>
            </div>
            <button @click="closeTab(index)"
                class="opacity-0 transition-all absolute right-1 p-1 group-hover:opacity-100 bg-background dark:bg-foreground hover:bg-default-200 dark:hover:bg-default-700">
                <XMarkIcon class="text-foreground dark:text-default size-5" />
            </button>
        </div>
    </div>
    <div class="max-w-4xl mt-12">
        <div class="flex gap-2 mx-4 w-full">
            <MainInput :tabs="tabs" :active-tab="activeTab" />
            <Button children="Senden" />
        </div>
    </div>
</template>