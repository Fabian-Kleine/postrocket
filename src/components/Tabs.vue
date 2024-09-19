<script setup lang="ts">
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { onMounted, Ref, ref, watch } from 'vue';
import Button from './ui/Button.vue';
import Radio from './ui/Radio.vue';
import Label from './ui/Label.vue';
import MainInput from './MainInput.vue';
import { Tabs, bodyTypeType } from "../types";

const tabs: Tabs = ref([]);

const activeTab: Ref<number, number> = ref(0);

const activeBodyType: Ref<bodyTypeType, bodyTypeType> = ref("none");

const setBodyType = (bodyType: bodyTypeType) => {
    activeBodyType.value = bodyType;
    const newTab = { ...tabs.value[activeTab.value], body: { content: tabs.value[activeTab.value].body.content, type: bodyType } };
    tabs.value[activeTab.value] = newTab;
    localStorage.setItem('tabs', JSON.stringify(newTab));
}

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
    activeBodyType.value = tabs.value[activeTab.value]?.body?.type || "none";
}

function addTab() {
    tabs.value.push({
        method: 'GET',
        url: '',
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
    activeTab.value = tabs.value.length - 1;
}

function updateBodyContent(e: Event) {
    const target = <HTMLTextAreaElement>e.target;

    if (activeBodyType.value == "JSON") {
        tabs.value[activeTab.value].body.content.JSON = target.value;
    }
    if (activeBodyType.value == "XML") {
        tabs.value[activeTab.value].body.content.XML = target.value;
    }
}

function addRowIfNeeded(index: number) {
    if (activeBodyType.value == "x-www-form-urlencoded") {
        if (index === tabs.value[activeTab.value].body.content.xWWWFormData.length - 1 && (tabs.value[activeTab.value].body.content.xWWWFormData[index].key != "" || tabs.value[activeTab.value].body.content.xWWWFormData[index].value != "")) {
            tabs.value[activeTab.value].body.content.xWWWFormData[index].active = true;
            tabs.value[activeTab.value].body.content.xWWWFormData.push({ active: null, key: '', value: '' });
        }
    }
    if (activeBodyType.value == "form-data") {
        if (index === tabs.value[activeTab.value].body.content.formData.length - 1 && (tabs.value[activeTab.value].body.content.formData[index].key != "" || tabs.value[activeTab.value].body.content.formData[index].value != "")) {
            tabs.value[activeTab.value].body.content.formData[index].active = true;
            tabs.value[activeTab.value].body.content.formData.push({ active: null, key: '', value: '' });
        }
    }
}

function rmRow(index: number) {
    if (activeBodyType.value == "form-data") {
        tabs.value[activeTab.value].body.content.formData.splice(index, 1);
    }

    if (activeBodyType.value == "x-www-form-urlencoded") {
        tabs.value[activeTab.value].body.content.xWWWFormData.splice(index, 1);
    }
 }

watch(tabs, () => {
    localStorage.setItem('tabs', JSON.stringify(tabs.value));
}, { deep: true });

watch(activeTab, () => {
    localStorage.setItem('activeTab', JSON.stringify(activeTab.value));
}, { deep: true });

onMounted(() => {
    if ("activeTab" in localStorage) {
        const savedActiveTab = localStorage.getItem('activeTab');
        const parsedSavedActiveTab = JSON.parse(savedActiveTab || "0");

        if (parsedSavedActiveTab) {
            activeTab.value = parsedSavedActiveTab;
        }
    }

    if ("tabs" in localStorage) {
        const savedTabs = localStorage.getItem('tabs');
        const parsedSavedTabs = JSON.parse(savedTabs || "");

        if (parsedSavedTabs) {
            tabs.value = parsedSavedTabs;
            activeBodyType.value = tabs.value[activeTab.value]?.body?.type || "none";
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
        <div @click="addTab"
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
        <textarea @input="updateBodyContent" v-if="activeBodyType == 'JSON'" rows="10"
            class="block w-full overflow-visible mt-4 bg-background dark:bg-foreground border border-default-200 dark:border-default-700 rounded-md outline-none p-2">{{ tabs[activeTab].body?.content && activeBodyType == 'JSON' ? tabs[activeTab].body?.content?.JSON : "" }}</textarea>
        <textarea @input="updateBodyContent" v-if="activeBodyType == 'XML'" rows="10"
            class="block w-full overflow-visible mt-4 bg-background dark:bg-foreground border border-default-200 dark:border-default-700 rounded-md outline-none p-2">{{ tabs[activeTab].body?.content && activeBodyType == "XML" ? tabs[activeTab].body?.content?.XML : "" }}</textarea>
        <table class="w-full text-left" v-if="activeBodyType == 'x-www-form-urlencoded'">
            <thead>
                <tr class="border-t border-b border-default-200 dark:border-default-700 text-default-600 dark:text-default">
                    <th class="w-8 border border-default-200 dark:border-default-700 p-2 font-normal"></th>
                    <th class="border border-default-200 dark:border-default-700 p-2 font-normal">Key</th>
                    <th class="border border-default-200 dark:border-default-700 p-2 font-normal">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in tabs[activeTab].body.content.xWWWFormData"
                    class="border-t border-b border-default-200 dark:border-default-700 group relative" :key="index">
                    <td class="border border-default-200 dark:border-default-700 p-2">
                        <input type="checkbox" class="accent-primary" v-if="data.active != null" v-model="data.active">
                    </td>
                    <td class="border border-default-200 dark:border-default-700 p-2"><input type="text"
                            class="bg-background dark:bg-foreground w-full outline-none focus:bg-default-100 dark:focus:bg-default-800 border border-transparent focus:border-default-200 dark:focus:border-default-700"
                            v-model="data.key" placeholder="Key" @input="addRowIfNeeded(index)">
                    </td>
                    <td class="border border-default-200 dark:border-default-700 p-2"><input type="text"
                            class="bg-background dark:bg-foreground w-full outline-none focus:bg-default-100 dark:focus:bg-default-800 border border-transparent focus:border-default-200 dark:focus:border-default-700"
                            v-model="data.value" placeholder="Value" @input="addRowIfNeeded(index)">
                    </td>
                    <button title="Eintrag löschen" v-if="data.active != null" @click="rmRow(index)"
                        class="opacity-0 transition-all rounded absolute mt-1.5 right-1 p-1 group-hover:opacity-100 bg-background dark:bg-foreground hover:bg-default-200 dark:hover:bg-default-700">
                        <TrashIcon class="text-foreground dark:text-default size-5" />
                    </button>
                </tr>
            </tbody>
        </table>
        <table class="w-full text-left" v-if="activeBodyType == 'form-data'">
            <thead>
                <tr class="border-t border-b border-default-200 dark:border-default-700 text-default-600 dark:text-default">
                    <th class="w-8 border border-default-200 dark:border-default-700 p-2 font-normal"></th>
                    <th class="border border-default-200 dark:border-default-700 p-2 font-normal">Key</th>
                    <th class="border border-default-200 dark:border-default-700 p-2 font-normal">Value</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in tabs[activeTab].body.content.formData"
                    class="border-t border-b border-default-200 dark:border-default-700 relative group" :key="index">
                    <td class="border border-default-200 dark:border-default-700 p-2">
                        <input type="checkbox" class="accent-primary" v-if="data.active != null" v-model="data.active">
                    </td>
                    <td class="border border-default-200 dark:border-default-700 p-2"><input type="text"
                            class="bg-background dark:bg-foreground w-full outline-none focus:bg-default-100 dark:focus:bg-default-800 border border-transparent focus:border-default-200 dark:focus:border-default-700"
                            v-model="data.key" placeholder="Key" @input="addRowIfNeeded(index)">
                    </td>
                    <td class="border border-default-200 dark:border-default-700 p-2"><input type="text"
                            class="bg-background dark:bg-foreground w-full outline-none focus:bg-default-100 dark:focus:bg-default-800 border border-transparent focus:border-default-200 dark:focus:border-default-700"
                            v-model="data.value" placeholder="Value" @input="addRowIfNeeded(index)">
                    </td>
                    <button title="Eintrag löschen" v-if="data.active != null" @click="rmRow(index)"
                        class="opacity-0 transition-all rounded absolute mt-1.5 right-1 p-1 group-hover:opacity-100 bg-background dark:bg-foreground hover:bg-default-200 dark:hover:bg-default-700">
                        <TrashIcon class="text-foreground dark:text-default size-5" />
                    </button>
                </tr>
            </tbody>
        </table>
    </div>
</template>