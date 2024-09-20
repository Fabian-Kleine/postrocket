<script setup lang="ts">
import { useNetworkStatus } from '../lib/hooks';
import { useToast } from 'vue-toastification';

const toast = useToast();

useNetworkStatus((status) => {
    if (status == "online") {
        toast.success("Du bist wieder online!")
    } else {
        toast.error("Du bist offline!");
    }
})
</script>