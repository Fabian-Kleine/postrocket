<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, Ref } from 'vue';
import { Tab } from '../types';
import methodColors from '../lib/methodColors';
import { cn } from '../lib/utils';

interface Props {
    tabs: Tab[];
    activeTab: number;
}

const { tabs, activeTab } = defineProps<Props>();

const selectOpen: Ref<boolean, boolean> = ref(false);

const selectClose = () => {
    selectOpen.value = false;
}

function handleMethodInput(e: Event) {
    const target = (<HTMLInputElement>e.target);

    tabs[activeTab].method = target.value.toUpperCase();
    selectOpen.value = false;
}

onMounted(() => {
    document.addEventListener('click', selectClose);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', selectClose);
});
</script>

<template>
    <div :class="cn('relative flex border border-default-200 dark:border-default-700 p-2 rounded-md flex-grow')">
        <input @focus="selectOpen = true" @click.stop @input="handleMethodInput"
            :class="cn('bg-background dark:bg-foreground font-bold w-24 outline-none focus:ring ring-offset-8 rounded-s-sm ring-primary ring-offset-background dark:ring-offset-foreground', methodColors(tabs[activeTab].method))"
            :value="tabs[activeTab].method" />
        <div v-if="selectOpen" @click.stop ref="methodsSelect"
            :class="cn('absolute top-12 left-0 min-w-32 p-2 bg-default-100 dark:bg-default-800 rounded-md shadow-lg')">
            <div @click="tabs[activeTab].method = 'GET'; selectOpen = false;"
                :class="cn('font-bold hover:bg-default-200 dark:hover:bg-default-700 py-1 px-4 cursor-pointer rounded-md', methodColors('get'))">
                GET</div>
            <div @click="tabs[activeTab].method = 'POST'; selectOpen = false;"
            :class="cn('font-bold hover:bg-default-200 dark:hover:bg-default-700 py-1 px-4 cursor-pointer rounded-md', methodColors('post'))">
                POST</div>
        </div>
        <div :class="cn('w-[1px] mx-4 h-full bg-default-200 dark:bg-default-700')"></div>
        <input type="text" v-model="tabs[activeTab].url"
            :class="cn('bg-background dark:bg-foreground flex-grow w-full h-full outline-none focus:ring ring-offset-8 rounded-e-sm ring-primary ring-offset-background dark:ring-offset-foreground')" />
    </div>
</template>