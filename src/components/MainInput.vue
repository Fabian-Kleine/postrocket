<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, Ref } from 'vue';

type Tab = {
    url: string,
    method: string
}[];

interface Props {
    tabs: Tab,
    activeTab: number
}

const { tabs, activeTab } = defineProps<Props>();

const selectOpen: Ref<boolean, boolean> = ref(false);

const selectClose = () => {
    selectOpen.value = false;
}

function handleMethodInput(e: Event) {
    const target = (<HTMLInputElement>e.target);

    tabs[activeTab].method = target.value;
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
    <div class="relative flex border border-default-200 dark:border-default-700 p-2 rounded-md flex-grow">
        <input @focus="selectOpen = !selectOpen" @click.stop @input="handleMethodInput"
            :class="['bg-background dark:bg-foreground font-bold w-24 outline-offset-4 outline-4 focus:outline-primary', tabs[activeTab].method == 'POST' ? 'text-warning' : '', tabs[activeTab].method == 'GET' ? 'text-success' : '']"
            :value="tabs[activeTab].method" />
        <div v-if="selectOpen" @click.stop ref="methodsSelect"
            class="absolute top-12 left-0 min-w-32 p-2 bg-default-100 dark:bg-default-800 rounded-md shadow-lg">
            <div @click="tabs[activeTab].method = 'POST'; selectOpen = false;"
                class="text-warning font-bold hover:bg-default-200 dark:hover:bg-default-700 py-1 px-4 cursor-pointer rounded-md">
                POST</div>
            <div @click="tabs[activeTab].method = 'GET'; selectOpen = false;"
                class="text-success font-bold hover:bg-default-200 dark:hover:bg-default-700 py-1 px-4 cursor-pointer rounded-md">
                GET</div>
        </div>
        <div class="w-[1px] mx-4 h-full bg-default-200 dark:bg-default-700"></div>
        <input type="text" v-model="tabs[activeTab].url"
            class="bg-background dark:bg-foreground flex-grow w-full h-full outline-offset-8 outline-4 focus:outline-primary" />
    </div>
</template>