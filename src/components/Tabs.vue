<script setup lang="ts">
import { XMarkIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { onBeforeMount, Ref, ref, watch } from 'vue';
import Button from './ui/Button.vue';
import Radio from './ui/Radio.vue';
import Label from './ui/Label.vue';
import DynamicTable from './ui/DynamicTable.vue';
import BodyTextareas from './BodyTextareas.vue';
import Textarea from './ui/Textarea.vue';
import MainInput from './MainInput.vue';
import { Tabs, bodyTypeType } from "../types";
import { cn, methodColors, buildUrlParams, buildFormData } from '../lib/utils';
import { useStorage } from '../lib/hooks';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();

const tabs: Tabs = ref([]);
const [tabsStorage, setTabsStorage] = useStorage("tabs", "local");

const [activeTab, setActiveTab] = useStorage("activeTab", "local");

const activeBodyType: Ref<bodyTypeType> = ref("none");

const isLoading: Ref<boolean> = ref(false);

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
        output: "",
        body: {
            type: 'none',
            content: {
                JSON: "{}",
                XML: undefined,
                Text: undefined,
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

onBeforeMount(() => {
    if ("tabs" in localStorage) {
        tabs.value = tabsStorage.value;
        activeBodyType.value = tabs.value[activeTab.value]?.body?.type || "none";
    }
});

async function sendRequest() {
    isLoading.value = true;
    tabs.value[activeTab.value].output = "Request wird gesendet";
    try {
        const method = tabs.value[activeTab.value].method;
        let url = tabs.value[activeTab.value].url;
        if (!url) {
            toast.warning("URL is leer!");
            tabs.value[activeTab.value].output = "URL is leer!";
            return;
        }
        try {
            new URL(url);
        } catch {
            url = "http://" + tabs.value[activeTab.value].url;
        }
        const searchParams = new URLSearchParams();
        const params = tabs.value[activeTab.value].params;

        params.filter(param => param.active).forEach(param => {
            searchParams.append(param.key, param.value);
        });

        let data;
        let headers;

        if (activeBodyType.value == "form-data") {
            data = buildFormData(tabs.value[activeTab.value].body.content.formData);
            headers = {'Content-Type': 'multipart/form-data'};
        } else
        if (activeBodyType.value == "x-www-form-urlencoded") {
            data = buildFormData(tabs.value[activeTab.value].body.content.xWWWFormData);
            headers = {'Content-Type': 'application/x-www-form-urlencoded'};
        } else
        if (activeBodyType.value == "JSON") {
            //@ts-ignore
            data = JSON.parse(tabs.value[activeTab.value].body.content.JSON);
            headers = {'Content-Type': 'application/json'};
        } else
        if (activeBodyType.value == "XML") {
            data = tabs.value[activeTab.value].body.content.XML;
            headers = {'Content-Type': 'application/xml'};
        } else
        if (activeBodyType.value == "text") {
            data = new String(tabs.value[activeTab.value].body.content.Text);
            headers = {'Content-Type': 'text/plain'};
        }

        const response = await axios({
            method,
            url,
            params: searchParams,
            timeout: 3000,
            data,
            headers
        });

        console.log(response);
        tabs.value[activeTab.value].output = JSON.stringify(response.data, null, "\t");
        toast.success("Daten empfangen!")
    } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
            if (error.message?.includes('timeout')) {
                toast.error("Request timeout!");
                tabs.value[activeTab.value].output = "Request timeout!";
                return;
            } else if (error.response && error.response?.status != 200) {
                toast.error(`${error.response?.status}: ${error.response?.statusText}`);
                tabs.value[activeTab.value].output = `${error.response?.status}: ${error.response?.statusText}`;
                return;
            }
        }
        toast.error("Beim senden ist ein Fehler aufgetreten!\nEin detaillierter Fehler Bericht wird in der Browser Konsole und im Output ausgegeben");
        tabs.value[activeTab.value].output = JSON.stringify(error, null, "\t");
    } finally {
        isLoading.value = false;
    }
}

</script>

<template>
    <div
        :class="cn('flex justify-left items-center flex-wrap border-b border-default-200 dark:border-default-700 pr-2')">
        <div :class="cn('flex justify-center items-center relative -bottom-[1px] group z-10', activeTab == index ? 'bg-background dark:bg-foreground' : '')"
            v-for="(tab, index) in tabs" :title="(tab.url + buildUrlParams(tab.params)) || 'Unbenannter Request'"
            v-if="tabs.length > 0">
            <div @click="openTab(index)"
                :class="cn('flex justify-left items-center gap-2 w-56 px-3 py-4 text-sm cursor-pointer border-default-200 dark:border-default-700', activeTab == index ? 'border-l border-r' : '')">
                <div v-if="activeTab == index" class="absolute top-0 left-0 w-full bg-primary h-1"></div>
                <span :class="['font-bold', methodColors(tab.method)]">{{
                    tab.method }}</span>
                <span
                    :class="['text-ellipsis', 'overflow-hidden', 'text-foreground', 'dark:text-default', 'text-nowrap', activeTab != index ? 'italic' : '']">{{
                        (tab.url + buildUrlParams(tab.params)) || 'Unbenannter Request' }}</span>
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
    <div class="flex justify-center items-center flex-col gap-10 w-screen mt-10" v-if="tabs.length == 0">
        <img src="/icon.png" alt="Logo" width="200">
        <div class="flex items-center flex-col gap-4">
            <h2 class="text-lg text-default-400">Erstelle einen neuen Request:</h2>
            <Button variant="primary" @click="addTab">Request erstellen</Button>
        </div>
    </div>
    <div class="max-w-4xl mt-12 mx-4" v-if="tabs.length > 0">
        <div class="flex justify-start items-center gap-2">
            <div
                :class="cn('text-primary-400 uppercase font-bold p-1 text-sm border border-default-200 dark:border-default-700 rounded-md')">
                http</div>
            <h2 class="my-4 cursor-default">{{ (tabs[activeTab].url + buildUrlParams(tabs[activeTab].params)) ||
                "Unbenannter Request" }}</h2>
        </div>
        <div class="flex gap-2 w-full">
            <MainInput :tabs="tabs" :active-tab="activeTab" />
            <Button :loading="isLoading" variant="primary" @click="sendRequest">Senden</Button>
        </div>
    </div>
    <div class="flex justify-around flex-col lg:flex-row gap-10 mx-4">
        <div class="flex-grow">
            <h2 class="mb-4 mt-8 font-bold text-lg">Params</h2>
            <DynamicTable :form-data="tabs[activeTab].params" />
        </div>
        <div class="flex-grow">
            <h2 class="mb-4 mt-8 font-bold text-lg">Body</h2>
            <Label for="none-radio">
                <Radio :disabled="isLoading" :checked="activeBodyType == 'none'" @input="setBodyType('none')" variant="primary"
                    name="body-format" id="none-radio" />
                none
            </Label>
            <Label for="form-data-radio">
                <Radio :disabled="isLoading" :checked="activeBodyType == 'form-data'" @input="setBodyType('form-data')" variant="primary"
                    name="body-format" id="form-data-radio" />
                form-data
            </Label>
            <Label for="x-www-form-urlencoded-radio">
                <Radio :disabled="isLoading" :checked="activeBodyType == 'x-www-form-urlencoded'"
                    @input="setBodyType('x-www-form-urlencoded')" variant="primary" name="body-format"
                    id="x-www-form-urlencoded-radio" />
                x-www-form-urlencoded
            </Label>
            <Label for="JSON-radio">
                <Radio :disabled="isLoading" :checked="activeBodyType == 'JSON'" @input="setBodyType('JSON')" variant="primary"
                    name="body-format" id="JSON-radio" />
                JSON
            </Label>
            <Label for="XML-radio">
                <Radio :disabled="isLoading" :checked="activeBodyType == 'XML'" @input="setBodyType('XML')" variant="primary"
                    name="body-format" id="XML-radio" />
                XML
            </Label>
            <Label for="text-radio">
                <Radio :disabled="isLoading" :checked="activeBodyType == 'text'" @input="setBodyType('text')" variant="primary"
                    name="body-format" id="text-radio" />
                Text
            </Label>
            <BodyTextareas :active-body-type="activeBodyType" :content="tabs[activeTab].body.content" />
            <DynamicTable v-if="activeBodyType == 'x-www-form-urlencoded'"
                :form-data="tabs[activeTab].body.content.xWWWFormData" />
            <DynamicTable v-if="activeBodyType == 'form-data'" :form-data="tabs[activeTab].body.content.formData" />
        </div>
    </div>
    <h2 class="mx-4 mb-4 mt-8 font-bold text-lg">Output</h2>
    <div class="px-4 py-2 mx-4 mt-2 border border-default-200 dark:border-default-700 rounded-md">
        <Textarea :style="{ height: 'max' }" v-if="tabs[activeTab].output" language='json' v-model="tabs[activeTab].output" disabled></Textarea>
        <div class="flex items-center flex-col gap-4 py-4" v-if="!tabs[activeTab].output">
            <h2 class="text-lg text-default-400">Request wurde noch nicht gesendet! Keine Output Daten verfügbar.</h2>
            <Button :loading="isLoading" variant="primary" @click="sendRequest">Request jetzt senden</Button>
        </div>
    </div>
</template>