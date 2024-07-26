<template>
  <div :class="display.width.value <= 600 ? 'containerMobile' : 'container'">
    <div class="conversations">
      <v-card 
        class="vCard"
        v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10,11]"
      >
        <div class="divAvatar">
          <v-avatar
            size="50"
            color="red"
          >
            <v-img 
              src="@/assets/pexels-justin-shaifer-501272-1222271.jpg" 
              alt="alt" 
              cover
            ></v-img>
          </v-avatar>
        </div>
  
        <div class="divMessage">
          <v-card-title class="py-0">Alex</v-card-title>
          <v-card-subtitle>Tudo bem?</v-card-subtitle>
        </div>
  
        <div class="divBadge">
          <p>11:30</p>
          <v-badge 
            color="success"
            content="2"
          ></v-badge>
        </div>
      </v-card>
    </div>

    <div class="messagesContainer">
      <div class="messagesHeader">
        
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';

  const display = useDisplay();

</script>

<style scoped>
@import url('@/styles/conversations.page.css');
</style>