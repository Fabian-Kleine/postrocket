<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Tabs from "./components/Tabs.vue";
import NetworkToast from "./components/NetworkToast.vue";
import { useWindowResize } from "./lib/hooks";

const { width } = useWindowResize();
</script>

<template>
  <Navbar />
  <Tabs v-if="width > 660" />
  <div class="flex justify-center items-center flex-col gap-10 w-screen mt-10" v-if="width <= 660">
    <img src="/icon.png" alt="Logo" width="200">
    <div class="flex items-center flex-col gap-4">
      <h1 class="text-xl text-default-400 text-center px-2"><span class="text-primary font-bold">Postrocket</span> funktioniert nur auf einer größeren Bildschirmbreite</h1>
    </div>
  </div>
  <NetworkToast />
</template>
