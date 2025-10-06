<script>
import AppH1 from '../components/AppH1.vue';
import AppButton from '../components/AppButton.vue';
import { register } from '../services/auth';

export default {
  name: 'Register',
  components: {
    AppH1,
    AppButton
  },
  data() {
    return {
      user:{
        email: '',
        password: '',
      },
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      try{
        this.loading = true;

        await register(this.user.email, this.user.password);

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
    <AppH1>Registrarse</AppH1>

    <form action="#" @submit.prevent="handleSubmit" class="card card-hover p-6 space-y-4">
      <div>
        <label for="email" class="label">Correo electrónico</label>
        <input
          autofocus
          required
          type="email"
          class="input"
          id="email"
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
          placeholder="••••••••"
          v-model="user.password"
        />
      </div>
      <div class="pt-2">
        <AppButton type="submit">Registrarse</AppButton>
      </div>
    </form>
  </div>
</template>