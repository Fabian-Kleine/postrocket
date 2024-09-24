<template>
    <Codemirror :style="{ height: '400px' }" :autofocus="true" :indent-with-tab="true" :tab-size="2"
        :extensions="extensions" @ready="handleReady" />
</template>

<script lang="ts">
import { computed, defineComponent, watch, shallowRef } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { jsonLanguage } from '@codemirror/lang-json';
import { xmlLanguage } from '@codemirror/lang-xml';
import { useTheme } from '../../lib/hooks';
import { dracula, tomorrow } from "thememirror";

interface Props {
    language: "json" | "xml" | "text";
}

export default defineComponent({
    components: {
        Codemirror
    },
    props: {
        language: {
            type: String,
            required: true
        }
    },
    setup(props: Props) {
        const { theme } = useTheme();
        const extensions = computed(() => {
            return [
                props.language === 'json' ? jsonLanguage : props.language === 'xml' ? xmlLanguage : null,
                theme.value === 'dark' ? dracula : tomorrow,
            ].filter(function (el) {
                return el != null;
            });
        });

        // Codemirror EditorView instance ref
        const view = shallowRef();

        const handleReady = (payload) => {
            view.value = payload.view;
        };

        watch(() => props.language, () => {
            if (view.value) {
                view.value.dispatch({
                    effects: view.value.state.facet.update(extensions.value),
                });
            };
        });

        return {
            extensions,
            handleReady
        }
    },
});
</script>