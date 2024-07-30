<template>
  <v-navigation-drawer
    permanent
    :rail="display.width.value <= 920"
    :class="display.width.value <= 920 ? 'navigation-drawer-mobile' : 'navigation-drawer'"
    :location="display.width.value <= 920 ? 'bottom' : 'left'"
  >
    <v-list 
      :class="display.width.value <= 920 ? 'vListMobile' : ''"
    >
      <v-list-item 
        v-for="(item, index) in itemsMenu"
        :prepend-icon="item.icon"
        :value="item.value"
        active-color="success"
        :key="index"
        height="64"
        :to="item.route"
        :class="display.width.value <= 920 ? 'vListItemMobile' : ''"
      >
        <v-list-item-title v-show="display.width.value > 920">{{ item.title }}</v-list-item-title>
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