<template>
  <v-navigation-drawer
    permanent
    :rail="display.width.value <= 500"
    :class="display.width.value <= 500 ? 'navigation-drawer-mobile' : 'navigation-drawer'"
    location="bottom"
  >
    <v-list 
      :class="display.width.value <= 500 ? 'd-flex pa-0' : ''"
    >
      <v-list-item 
        v-for="(item, index) in itemsMenu"
        :prepend-icon="item.icon"
        :value="item.value"
        active-color="success"
        :key="index"
        height="64"
        :to="item.route"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify'

  //const drawer = ref(true);
  const display = useDisplay();
  const itemsMenu = ref([
    {
      icon:'mdi-view-dashboard',
      title: 'Publicações',
      value: 'publications',
      route: '/'
    },

    {
      icon:'mdi-chat',
      title: 'Conversas',
      value: 'conversations',
      route: '/conversations'
    },

    {
      icon:'mdi-account-group',
      title: 'Contatos',
      value: 'contacts',
      route: '/contacts'
    },
  ])
</script>

<style scoped>
@import url('@/styles/navigationDrawer.css');
</style>