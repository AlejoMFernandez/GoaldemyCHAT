<script>
import AppH1 from '../components/AppH1.vue';
import AppButton from '../components/AppButton.vue';
import { login } from '../services/auth';

export default {
  name: 'Login',
  components: {
    AppH1,
    AppButton
  },
  data() {
    return {
      loading: false,
      user:{
        email: '',
        password: '',
      }
    };
  },
  methods: {
    async handleSubmit() {
      try{
        this.loading = true;

        await login(this.user.email, this.user.password);

        this.$router.push('/profile');
      } catch(error){
        console.error(error);
      }
      this.loading = true;
    },
  }
}
</script>

<template>
  <div class="mx-auto max-w-lg">
    <AppH1>Iniciar sesión</AppH1>

    <form action="#" @submit.prevent="handleSubmit" class="card card-hover p-6 space-y-4">
      <div>
        <label for="email" class="label">Correo electrónico</label>
        <input
          autofocus
          required
          type="email"
          class="input"
          id="email"
          autocomplete="email"
          autocapitalize="none"
          placeholder="tu@email.com"
          v-model="user.email"
        />
      </div>
      <div>
        <label for="password" class="label">Contraseña</label>
        <input
          required
          type="password"
          class="input"
          id="password"
          autocomplete="current-password"
          placeholder="••••••••"
          v-model="user.password"
        />
      </div>
      <div class="pt-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <AppButton type="submit">Acceder</AppButton>
        <span>¿No tienes cuenta? <router-link to="/register" class="text-blue-500">Regístrate</router-link></span>
      </div>
    </form>
  </div>
</template>