<template>
  <div :class="display.width.value <= 920 ? 'containerMobile' : 'container'">
    <div class="conversations">

      <div class="search">
        <v-icon size="32" color="#d2d7e6">mdi-magnify</v-icon>

        <input 
          type="text"
          placeholder="Pesquisar"
        ></input>
      </div>

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
        <div class="userContent">
          <p>Alex</p>
          <span>online</span>
        </div>

        <div>
          <v-btn 
            color="#d2d7e6" 
            icon="mdi-dots-vertical"
            variant="solo"
          ></v-btn>
        </div>
      </div>

      <div class="messagesList">
        <div class="messageItem">
          <p>Olá, tudo bem?</p>
          <span>11:30</span>
        </div>

        <div 
          class="messageItem"
          style="align-self: flex-end; background: rgb(28,48,94);"
        >
          <p>Estou bem, e você?</p>
          <span>11:31</span>
        </div>

        <div class="messageItem" v-for="(item, index) in [1,2,3,4,5,6,7,8,9,10,11]">
          <p>Também estou bem!</p>
          <span>11:32</span>
        </div>
      </div>

      <div class="messagesFooter">
        <input 
          type="text"
          placeholder="Mensagem"
        ></input>

        <v-btn 
          color="success" 
          icon="mdi-send"
          @click="createMessage"
        ></v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';
import socketClient from '@/plugins/socketClient';
import { useAuthStore } from '@/stores/auth';

  const display = useDisplay();
  const authStore = useAuthStore();

  async function joinRoom() {
    socketClient.socket('/messages').emit('joinRoom', authStore.userAuth?._id);
  }

  async function createMessage() {  
    const today = new Date()
    socketClient.socket('/messages').emit('createMessage', {
      sender: authStore.userAuth?._id,
      receiver: '66aa9c538e32fbd87e144bdf',
      text: 'Fala ai Edson.',
      sendDate: today,
    }, (response:any) => {
      // console.log(response)
    })
  }

  async function findAllMessages() {
    socketClient.socket('/messages').emit('findAllMessages', authStore.userAuth?._id, (response:any) => {
      // console.log(response)
    })
  }

  //Uma nova mensagem é recebida
  socketClient.socket('/messages').on('receiveMessage', (response:any) => {
    console.log(response)
  })

  onMounted(() => {
    findAllMessages()
    joinRoom()
  })
</script>

<style scoped>
@import url('@/styles/conversations.page.css');
</style>