<script setup lang="ts">
import { XMarkIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { onMounted, Ref, ref, watch } from 'vue';
import Button from './ui/Button.vue';
import Radio from './ui/Radio.vue';
import Label from './ui/Label.vue';
import MainInput from './MainInput.vue';

type Tab = {
    url: string,
    method: string
}

type Tabs = Ref<Tab[], Tab[]>;

const tabs: Tabs = ref([]);

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

watch(tabs, () => {
    localStorage.setItem('tabs', JSON.stringify(tabs.value));
}, { deep: true });

watch(activeTab, () => {
    localStorage.setItem('activeTab', JSON.stringify(activeTab.value));
}, { deep: true });

onMounted(() => {
    if ("tabs" in localStorage) {
        const savedTabs = localStorage.getItem('tabs');
        const parsedSavedTabs = JSON.parse(savedTabs || "");

        if (parsedSavedTabs) {
            tabs.value = parsedSavedTabs;
        }
    }

    if ("activeTab" in localStorage) {
        const savedActiveTab = localStorage.getItem('activeTab');
        const parsedSavedActiveTab = JSON.parse(savedActiveTab || "0");

        if (parsedSavedActiveTab) {
            activeTab.value = parsedSavedActiveTab;
        }
    }
})
</script>

<template>
    <div class="flex justify-left items-center border-b border-default-200 dark:border-default-700">
        <div class="flex justify-center items-center relative -bottom-[1px] group z-10"
            :class="activeTab == index ? 'bg-background dark:bg-foreground' : ''" v-for="(tab, index) in tabs"
            :title="tab.url || 'Unbenannter Request'" v-if="tabs.length > 0">
            <div @click="openTab(index)"
                class="flex justify-left items-center gap-2 w-56 px-3 py-4 text-sm cursor-pointer border-default-200 dark:border-default-700"
                :class="activeTab == index ? 'border-l border-r' : ''">
                <div v-if="activeTab == index" class="absolute top-0 left-0 w-full bg-primary h-1"></div>
                <span
                    :class="['font-bold', tab.method == 'POST' ? 'text-warning' : '', tab.method == 'GET' ? 'text-success' : '']">{{
                        tab.method }}</span>
                <span
                    :class="['text-ellipsis', 'overflow-hidden', 'text-foreground', 'dark:text-default', activeTab != index ? 'italic' : '']">{{
                        tab.url || 'Unbenannter Request' }}</span>
            </div>
            <button @click="closeTab(index)"
                class="opacity-0 transition-all absolute right-1 p-1 group-hover:opacity-100 bg-background dark:bg-foreground hover:bg-default-200 dark:hover:bg-default-700">
                <XMarkIcon class="text-foreground dark:text-default size-5" />
            </button>
        </div>
        <div @click="tabs.push({ method: 'GET', url: '' }); activeTab = tabs.length - 1;"
            class="flex justify-left items-center gap-2 ml-2 h-fit p-2 rounded-md text-sm cursor-pointer transition-colors border-default-200 dark:border-default-700 hover:bg-default-300/50 dark:hover:bg-default-600">
            <PlusIcon class="text-foreground dark:text-default size-5" />
        </div>
    </div>
    <div class="max-w-4xl mt-12 mx-4" v-if="tabs.length > 0">
        <div class="flex justify-start items-center gap-2">
            <div
                class="text-primary-400 uppercase font-bold p-1 text-sm border border-default-200 dark:border-default-700 rounded-md">
                http</div>
            <h2 class="my-4 cursor-default">{{ tabs[activeTab].url || "Unbenannter Request" }}</h2>
        </div>
        <div class="flex gap-2 w-full">
            <MainInput :tabs="tabs" :active-tab="activeTab" />
            <Button variant="primary">Senden</Button>
        </div>
        <h2 class="my-4 font-bold text-lg">Body</h2>
        <Label for="none-radio">
            <Radio checked variant="primary" name="body-format" id="none-radio" value="none" />
            none
        </Label>
        <Label for="form-data-radio">
            <Radio variant="primary" name="body-format" id="form-data-radio" value="form-data" />
            form-data
        </Label>
        <Label for="x-www-form-urlencoded-radio">
            <Radio variant="primary" name="body-format" id="x-www-form-urlencoded-radio" value="x-www-form-urlencoded" />
            x-www-form-urlencoded
        </Label>
        <Label for="JSON-radio">
            <Radio variant="primary" name="body-format" id="JSON-radio" value="JSON" />
            JSON
        </Label>
        <Label for="XML-radio">
            <Radio variant="primary" name="body-format" id="XML-radio" value="XML" />
            XML
        </Label>
    </div>
</template>