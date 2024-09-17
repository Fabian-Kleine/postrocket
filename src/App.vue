<script setup lang="ts">
  import Navbar from "./components/Navbar.vue";
  import Tabs from "./components/Tabs.vue";
</script>

<template>
  <Navbar />
  <Tabs />
  <div class="flex justify-center items-center w-screen gap-4">
    <img src="/icon.png" class="w-48" alt="Logo" />
    <h1 class="text-6xl text-primary font-bold">Postman Clone</h1>
  </div>
</template>
