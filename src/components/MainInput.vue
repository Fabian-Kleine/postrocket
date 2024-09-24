<script setup lang="ts">
import { ref, Ref } from 'vue';
import { Tab } from '../types';
import { cn, methodColors } from '../lib/utils';
import { useOnClickOutside } from '../lib/hooks';

interface Props {
    tabs: Tab[];
    activeTab: number;
}

const { tabs, activeTab } = defineProps<Props>();

const selectOpen: Ref<boolean, boolean> = ref(false);

const selectRef = ref(null);

const selectClose = () => {
    selectOpen.value = false;
}

useOnClickOutside(selectRef, selectClose);

function handleMethodInput(e: Event) {
    const target = (<HTMLInputElement>e.target);

    tabs[activeTab].method = target.value.toUpperCase();
    selectOpen.value = false;
}
</script>

<template>
    <div :class="cn('relative flex border border-default-200 dark:border-default-700 p-2 rounded-md flex-grow')">
        <input @focus="selectOpen = true" @click.stop @input="handleMethodInput"
            :class="cn('bg-background dark:bg-foreground font-bold w-24 outline-none focus:ring ring-offset-8 rounded-s-sm ring-primary ring-offset-background dark:ring-offset-foreground', methodColors(tabs[activeTab].method))"
            :value="tabs[activeTab].method" />
        <div v-if="selectOpen" @click.stop ref="selectRef"
            :class="cn('absolute top-12 left-0 min-w-32 p-2 bg-default-100 dark:bg-default-800 rounded-md shadow-lg z-30')">
            <div @click="tabs[activeTab].method = 'GET'; selectOpen = false;"
                :class="cn('font-bold hover:bg-default-200 dark:hover:bg-default-700 py-1 px-4 cursor-pointer rounded-md', methodColors('get'))">
                GET</div>
            <div @click="tabs[activeTab].method = 'POST'; selectOpen = false;"
                :class="cn('font-bold hover:bg-default-200 dark:hover:bg-default-700 py-1 px-4 cursor-pointer rounded-md', methodColors('post'))">
                POST</div>
            <div @click="tabs[activeTab].method = 'PUT'; selectOpen = false;"
                :class="cn('font-bold hover:bg-default-200 dark:hover:bg-default-700 py-1 px-4 cursor-pointer rounded-md', methodColors('put'))">
                PUT</div>
            <div @click="tabs[activeTab].method = 'PATCH'; selectOpen = false;"
                :class="cn('font-bold hover:bg-default-200 dark:hover:bg-default-700 py-1 px-4 cursor-pointer rounded-md', methodColors('patch'))">
                PATCH</div>
            <div @click="tabs[activeTab].method = 'DELETE'; selectOpen = false;"
                :class="cn('font-bold hover:bg-default-200 dark:hover:bg-default-700 py-1 px-4 cursor-pointer rounded-md', methodColors('delete'))">
                DELETE</div>
            <div @click="tabs[activeTab].method = 'HEAD'; selectOpen = false;"
                :class="cn('font-bold hover:bg-default-200 dark:hover:bg-default-700 py-1 px-4 cursor-pointer rounded-md', methodColors('head'))">
                HEAD</div>
            <div @click="tabs[activeTab].method = 'OPTIONS'; selectOpen = false;"
                :class="cn('font-bold hover:bg-default-200 dark:hover:bg-default-700 py-1 px-4 cursor-pointer rounded-md', methodColors('options'))">
                OPTIONS</div>
        </div>
        <div :class="cn('w-[1px] mx-4 h-full bg-default-200 dark:bg-default-700')"></div>
        <input type="text" v-model="tabs[activeTab].url"
            :class="cn('bg-background dark:bg-foreground flex-grow w-full h-full outline-none focus:ring ring-offset-8 rounded-e-sm ring-primary ring-offset-background dark:ring-offset-foreground')" />
    </div>
</template>