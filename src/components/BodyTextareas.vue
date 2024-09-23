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
<Textarea v-if="activeBodyType == 'XML'" :language="'xml'"  v-model="content.XML"></Textarea>
<Textarea v-if="activeBodyType == 'JSON'" :language="'json'" v-model="content.JSON"></Textarea>
</template>