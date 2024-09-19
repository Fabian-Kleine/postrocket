<script setup lang="ts">
import { bodyTypeType, Tab } from '../types';
import Textarea from './ui/Textarea.vue';

interface Props {
    content: Tab["body"]["content"];
    activeBodyType: bodyTypeType;
}

const { activeBodyType, content } = defineProps<Props>();

function updateBodyContent(e: Event) {
    const target = <HTMLTextAreaElement>e.target;

    if (activeBodyType == "JSON") {
        content.JSON = target.value;
    }
    if (activeBodyType == "XML") {
        content.XML = target.value;
    }
}
</script>

<template>
<Textarea v-if="activeBodyType == 'XML'" @input="updateBodyContent" :value="content && activeBodyType == 'XML' ? content.XML : ''"></Textarea>
<Textarea v-if="activeBodyType == 'JSON'" @input="updateBodyContent" :value="content && activeBodyType == 'JSON' ? content.JSON : ''"></Textarea>
</template>