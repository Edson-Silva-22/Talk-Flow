<template>
  <v-app>
    <v-main class="main">
      <Alert/>

      <v-form 
        class="vForm" 
        style="max-width: 500px;" 
        @submit="register"
      >
        <h1 class="vForm_title">Cadastro</h1>

        <v-text-field
          name="name"
          placeholder="Informe seu nome"
          class="vForm_textField"
          variant="solo"
          clearable
          v-model="name"
          :errorMessages="errors.name"
        ></v-text-field>
        
        <v-text-field
          name="email"
          placeholder="Informe seu email"
          class="vForm_textField"
          variant="solo"
          clearable
          v-model="email"
          :errorMessages="errors.email"
        ></v-text-field>

        <v-text-field
          name="senha"
          placeholder="Digite sua senha"
          class="vForm_textField"
          variant="solo"
          @click:append-inner="viewPassword = !viewPassword"
          :append-inner-icon="viewPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="viewPassword ? 'text' : 'password'"
          clearable
          v-model="password"
          :errorMessages="errors.password"
        ></v-text-field>

        <v-text-field
          name="confirmPassword"
          placeholder="Confirme sua senha"
          class="vForm_textField"
          variant="solo"
          @click:append-inner="viewConfirmPassword = !viewConfirmPassword"
          :append-inner-icon="viewConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="viewConfirmPassword ? 'text' : 'password'"
          clearable
          v-model="confirmPassword"
          :errorMessages="errors.confirmPassword"
        ></v-text-field>

        <v-text-field
          name="nickname"
          placeholder="Digite um apelido"
          class="vForm_textField"
          variant="solo"
          clearable
          v-model="nickname"
          :errorMessages="errors.nickname"
        ></v-text-field>

        <v-btn 
          class="vForm_btn"
          color="success"
          type="submit"
          :loading="loading"
        >Cadastra-se</v-btn>

        <v-btn 
          class="vForm_btn" 
          variant='outlined'
          color="error"
          @click="router.push('/')"
        >Cancelar</v-btn>
      </v-form>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod'
import { useRouter } from 'vue-router';
import Alert from '@/components/Alert.vue';
import { useUserStore } from '@/stores/user'
import { useAlertStore } from '@/stores/alert'

  const viewPassword = ref(false)
  const viewConfirmPassword = ref(false)
  const loading = ref(false)
  const router = useRouter();
  const alertStore = useAlertStore();
  const userStore = useUserStore();
  const validationSchema = toTypedSchema(
    z.object({
      name: z
        .string({required_error: 'Informe seu nome.', invalid_type_error: 'Informe seu nome'})
        .min(1, {message: 'Informe seu nome.'}),
      email: z
        .string({required_error: 'Informe seu email.', invalid_type_error: 'Informe seu email'})
        .min(1, {message: 'Informe seu email.'})
        .email({message: 'Informe um email válido.'})
        .endsWith('@gmail.com', {message: 'Email válido'}),
      password: z
        .string({required_error: 'Digite sua senha.', invalid_type_error: 'Digite sua senha'})
        .min(1, {message: 'Digite sua senha.'}),
      confirmPassword: z
        .string({required_error: 'Confirme sua senha.', invalid_type_error: 'Confirme sua senha'})
        .min(1, {message: 'Confirme sua senha.'})
        .refine((value) => value === password.value, {
          message: 'As senhas devem ser iguais.',
          path: ['confirmPassword']
        }),
      nickname: z
        .string({required_error: 'Informe seu apelido.', invalid_type_error: 'Informe seu apelido'})
        .min(1, {message: 'Informe seu apelido.'}),
    })
  )

  const { handleSubmit, errors } = useForm({ validationSchema });
  const { value: name } = useField('name')
  const { value: email } = useField('email')
  const { value: password } = useField('password')
  const { value: confirmPassword } = useField('confirmPassword')
  const { value: nickname } = useField('nickname')

  const register = handleSubmit(async (values) => {
    loading.value = true;
    const response = await userStore.create({
      name: values.name,
      email: values.email,
      password: values.password,
      nickname: values.nickname,
    })

    if (response.status == 201) {
      loading.value = false;
      alertStore.createAlert('Cadastro realizado com sucesso.', 'success')
      router.push('/login')
    }

    loading.value = false;
  })

</script>

<style scoped>
@import "@/styles/login.page.css";
</style>
