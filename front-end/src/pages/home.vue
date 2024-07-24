<template>
  <v-main>
    <h1>Home page</h1>

    <v-btn 
      class="vForm_btn"
      color="success"
      type="submit"
      @click="logout"
    >Sair</v-btn>
  </v-main>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

  const authStore = useAuthStore();
  const router = useRouter();

  async function logout() {
    await authStore.logout();
    router.push('/login');
  }
</script>

<style scoped></style>