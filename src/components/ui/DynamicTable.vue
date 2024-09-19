<script setup lang="ts">
import { bodyTypeType, FormDataType } from '../../types';
import { TrashIcon } from '@heroicons/vue/24/outline';

interface Props {
    formData: Array<FormDataType>;
    activeBodyType: bodyTypeType;
}

const { formData } = defineProps<Props>();

function addRowIfNeeded(index: number) {
    if (index === formData.length - 1 && (formData[index].key != "" || formData[index].value != "")) {
        formData[index].active = true;
        formData.push({ active: null, key: '', value: '' });
    }
}

function rmRow(index: number) {
    formData.splice(index, 1);
}

</script>

<template>
    <table class="w-full text-left">
        <thead>
            <tr class="border-t border-b border-default-200 dark:border-default-700 text-default-600 dark:text-default">
                <th class="w-8 border border-default-200 dark:border-default-700 p-2 font-normal"></th>
                <th class="border border-default-200 dark:border-default-700 p-2 font-normal">Key</th>
                <th class="border border-default-200 dark:border-default-700 p-2 font-normal">Value</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data, index) in formData"
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
</template>