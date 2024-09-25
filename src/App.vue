<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Tabs from "./components/Tabs.vue";
import NetworkToast from "./components/NetworkToast.vue";
import { useWindowResize } from "./lib/hooks";
import { isTouchEnabled } from "./lib/utils";
import { ref } from "vue";

const { width } = useWindowResize();

const touchEnabled = ref<boolean>(isTouchEnabled());
</script>

<template>
  <Navbar />
  <Tabs v-if="width > 660 && !touchEnabled" />
  <div class="flex justify-center items-center flex-col gap-10 w-screen mt-10" v-if="width <= 660 || touchEnabled">
    <img src="/icon.png" alt="Logo" width="200">
    <div class="flex items-center flex-col gap-4">
      <h1 class="text-xl text-default-400 text-center px-2"><span class="text-primary font-bold">Postrocket</span> funktioniert {{touchEnabled ? 'nicht auf Geräten mit Touchscreen' : 'nur auf einer größeren Bildschirmbreite'}}</h1>
      <p class="text-default-400 text-center px-2" v-if="touchEnabled">Klicke <span class="underline cursor-pointer" @click="touchEnabled = false">hier</span> wenn dein Gerät falscher Weise als Touchscreen erkannt wurde</p>
    </div>
  </div>
  <NetworkToast />
</template>
