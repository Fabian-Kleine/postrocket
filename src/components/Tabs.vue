<script setup lang="ts">
import { XMarkIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { onMounted, Ref, ref, watch } from 'vue';
import Button from './ui/Button.vue';
import Radio from './ui/Radio.vue';
import Label from './ui/Label.vue';
import DynamicTable from './ui/DynamicTable.vue';
import BodyTextareas from './BodyTextareas.vue';
import MainInput from './MainInput.vue';
import { Tabs, bodyTypeType } from "../types";
import { cn, methodColors } from '../lib/utils';
import { useStorage } from '../lib/hooks';

const tabs: Tabs = ref([]);
const [tabsStorage, setTabsStorage] = useStorage("tabs", "local");

const [activeTab, setActiveTab] = useStorage("activeTab", "local");

const activeBodyType: Ref<bodyTypeType, bodyTypeType> = ref("none");

const setBodyType = (bodyType: bodyTypeType) => {
    activeBodyType.value = bodyType;
    const newTab = { ...tabs.value[activeTab.value], body: { content: tabs.value[activeTab.value].body.content, type: bodyType } };
    tabs.value[activeTab.value] = newTab;
    setTabsStorage(newTab);
}

function closeTab(i: number) {
    tabs.value.splice(i, 1);
    tabs.value = [...tabs.value];
    if (activeTab.value >= tabs.value.length) {
        setActiveTab(tabs.value.length - 1);
    } else if (activeTab.value == i) {
        setActiveTab(i > 0 ? i - 1 : 0);
    }
}

function openTab(i: number) {
    setActiveTab(i);
    activeBodyType.value = tabs.value[activeTab.value]?.body?.type || "none";
}

function addTab() {
    tabs.value.push({
        method: 'GET',
        url: '',
        params: [{ active: null, key: '', value: '' }],
        body: {
            type: 'none',
            content: {
                JSON: "{}",
                XML: undefined,
                formData: [{ active: null, key: '', value: '' }],
                xWWWFormData: [{ active: null, key: '', value: '' }],
            }
        }
    });
    setActiveTab(tabs.value.length - 1);
    activeBodyType.value = 'none';
}

watch(tabs, () => {
    setTabsStorage(tabs.value);
}, { deep: true });

onMounted(() => {
    if ("tabs" in localStorage) {
        //@ts-ignore
        tabs.value = tabsStorage.value;
        activeBodyType.value = tabs.value[activeTab.value]?.body?.type || "none";
    }
});

</script>

<template>
    <div :class="cn('flex justify-left items-center border-b border-default-200 dark:border-default-700')">
        <div :class="cn('flex justify-center items-center relative -bottom-[1px] group z-10', activeTab == index ? 'bg-background dark:bg-foreground' : '')"
            v-for="(tab, index) in tabs" :title="tab.url || 'Unbenannter Request'" v-if="tabs.length > 0">
            <div @click="openTab(index)"
                :class="cn('flex justify-left items-center gap-2 w-56 px-3 py-4 text-sm cursor-pointer border-default-200 dark:border-default-700', activeTab == index ? 'border-l border-r' : '')">
                <div v-if="activeTab == index" class="absolute top-0 left-0 w-full bg-primary h-1"></div>
                <span :class="['font-bold', methodColors(tab.method)]">{{
                    tab.method }}</span>
                <span
                    :class="['text-ellipsis', 'overflow-hidden', 'text-foreground', 'dark:text-default', activeTab != index ? 'italic' : '']">{{
                        tab.url || 'Unbenannter Request' }}</span>
            </div>
            <button @click="closeTab(index)"
                :class="cn('opacity-0 transition-all absolute right-1 p-1 group-hover:opacity-100 bg-background dark:bg-foreground hover:bg-default-200 dark:hover:bg-default-700')">
                <XMarkIcon class="text-foreground dark:text-default size-5" />
            </button>
        </div>
        <div @click="addTab"
            :class="cn('flex justify-left items-center gap-2 ml-2 h-fit p-2 rounded-md text-sm cursor-pointer transition-colors border-default-200 dark:border-default-700 hover:bg-default-300/50 dark:hover:bg-default-600')">
            <PlusIcon class="text-foreground dark:text-default size-5" />
        </div>
    </div>
    <div class="max-w-4xl mt-12 mx-4" v-if="tabs.length > 0">
        <div class="flex justify-start items-center gap-2">
            <div
                :class="cn('text-primary-400 uppercase font-bold p-1 text-sm border border-default-200 dark:border-default-700 rounded-md')">
                http</div>
            <h2 class="my-4 cursor-default">{{ tabs[activeTab].url || "Unbenannter Request" }}</h2>
        </div>
        <div class="flex gap-2 w-full">
            <MainInput :tabs="tabs" :active-tab="activeTab" />
            <Button variant="primary">Senden</Button>
        </div>
        <h2 class="mb-4 mt-8 font-bold text-lg">Params</h2>
        <DynamicTable :form-data="tabs[activeTab].params" />
        <h2 class="mb-4 mt-8 font-bold text-lg">Body</h2>
        <Label for="none-radio">
            <Radio :checked="activeBodyType == 'none'" @input="setBodyType('none')" variant="primary" name="body-format"
                id="none-radio" />
            none
        </Label>
        <Label for="form-data-radio">
            <Radio :checked="activeBodyType == 'form-data'" @input="setBodyType('form-data')" variant="primary"
                name="body-format" id="form-data-radio" />
            form-data
        </Label>
        <Label for="x-www-form-urlencoded-radio">
            <Radio :checked="activeBodyType == 'x-www-form-urlencoded'" @input="setBodyType('x-www-form-urlencoded')"
                variant="primary" name="body-format" id="x-www-form-urlencoded-radio" />
            x-www-form-urlencoded
        </Label>
        <Label for="JSON-radio">
            <Radio :checked="activeBodyType == 'JSON'" @input="setBodyType('JSON')" variant="primary" name="body-format"
                id="JSON-radio" />
            JSON
        </Label>
        <Label for="XML-radio">
            <Radio :checked="activeBodyType == 'XML'" @input="setBodyType('XML')" variant="primary" name="body-format"
                id="XML-radio" />
            XML
        </Label>
        <Label for="text-radio">
            <Radio :checked="activeBodyType == 'text'" @input="setBodyType('text')" variant="primary" name="body-format"
                id="text-radio" />
            Text
        </Label>
        <BodyTextareas :active-body-type="activeBodyType" :content="tabs[activeTab].body.content" />
        <DynamicTable v-if="activeBodyType == 'x-www-form-urlencoded'"
            :form-data="tabs[activeTab].body.content.xWWWFormData" />
        <DynamicTable v-if="activeBodyType == 'form-data'" :form-data="tabs[activeTab].body.content.formData" />
    </div>
</template>