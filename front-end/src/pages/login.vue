<template>
  <v-app>
    <v-main class="main">
      <v-form class="vForm" @submit="login">
        <h1 class="vForm_title">Login</h1>

        
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
          append-inner-icon="mdi-eye"
          clearable
          v-model="senha"
          :errorMessages="errors.senha"
        ></v-text-field>

        <v-btn 
          class="vForm_btn"
          color="success"
          type="submit"
        >Entrar</v-btn>

        <v-btn 
          class="vForm_btn" 
          variant='outlined'
          color="success"
        >Cadastra-se</v-btn>

        <a href="">Esquieci minha senha.</a>
      </v-form>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod'

  const validationSchema = toTypedSchema(
    z.object({
      email: z
      .string({required_error: 'Informe seu email.', invalid_type_error: 'Informe seu email'})
      .min(1, {message: 'Informe seu email.'})
      .email({message: 'Informe um email válido.'})
      .endsWith('@gmail.com', {message: 'Email válido'}),
      senha: z
        .string({required_error: 'Digite sua senha.', invalid_type_error: 'Digite sua senha'})
        .min(1, {message: 'Digite sua senha.'}),
    })
  )

  const { handleSubmit, errors } = useForm({ validationSchema });

  const { value: email } = useField('email')
  const { value: senha } = useField('senha')

  const login = handleSubmit(async (values) => {
    console.log(values)
  })

</script>

<style scoped>
@import "@/styles/login.page.css";
</style>
