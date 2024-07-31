<template>
  <v-app-bar class="header">
    <template v-slot:prepend>
      <p class="header-logo">Talk <v-icon icon="mdi-message-text" color="success"></v-icon> Flow</p>
    </template>

    <template v-slot:append>
      <v-btn icon="mdi-account" color="#d2d7e6"></v-btn>
      <v-btn icon="mdi-cog" color="#d2d7e6"></v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>

</script>

<style scoped>
@import '@/styles/header.component.css';
</style>