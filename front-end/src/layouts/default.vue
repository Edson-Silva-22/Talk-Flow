<template>
  <v-app>
    <Header></Header>

    <v-main>
      <router-view />
    </v-main>

    <NavigationDrawer></NavigationDrawer>

    <!-- <AppFooter /> -->
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>

<style>
  html{
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .v-main{
    background-color: #131a2b;
    height: 100% !important;
  }
</style>