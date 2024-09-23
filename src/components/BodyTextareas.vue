<script setup lang="ts">
import { bodyTypeType, Tab } from '../types';
import Textarea from './ui/Textarea.vue';

interface Props {
    content: Tab["body"]["content"];
    activeBodyType: bodyTypeType;
}

const { activeBodyType, content } = defineProps<Props>();
</script>

<template>
    <div class="px-4 py-2 border border-default-200 dark:border-default-700 rounded-md">
        <Textarea v-if="activeBodyType == 'XML'" :language="'xml'" v-model="content.XML"></Textarea>
        <Textarea v-if="activeBodyType == 'JSON'" :language="'json'" v-model="content.JSON"></Textarea>
    </div>
</template>