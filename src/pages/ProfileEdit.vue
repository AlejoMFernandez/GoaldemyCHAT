<script>
import AppH1 from '../components/AppH1.vue';
import AppButton from '../components/AppButton.vue';
import { subscribeToAuthStateChanges, updateAuthUserData } from '../services/auth';

let unsubscribeAuth = () => {};

export default {
  name: 'ProfileEdit',
  components: {
    AppH1,
    AppButton
  },
  data() {
    return {
      formData: {
        display_name: '',
        bio: '',
        career: '',
      },
    }
  },
  computed: {
    avatarInitial() {
      if (!this.user?.email) return '?';
      const letter = this.user.email.trim()[0] || '?';
      return letter.toUpperCase();
    }
  },
  methods: {
    async handleSubmit(){
      try {
        this.loading = true;
        await updateAuthUserData(this.formData);
      } catch (error) {

      }
      this.loading = false;
    }
  },
  mounted() {
    unsubscribeAuth = subscribeToAuthStateChanges(userState => {
      this.formData = {
        display_name: userState.display_name ?? '',
        bio: userState.bio ?? '',
        career: userState.career ?? '',
      }
    });
  },
  unmounted() {
    unsubscribeAuth();
  }
}
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <AppH1>Editar mi Perfil</AppH1>

    <form @submit.prevent="handleSubmit" class="card card-hover p-6 space-y-4"> 
      <div>
        <label for="display_name" class="label">Nombre para mostrar</label>
        <input
          autofocus
          type="text"
          class="input"
          id="display_name"
          placeholder="Tu nombre"
          v-model="formData.display_name"
        />
      </div>      
      <div>
        <label for="bio" class="label">Biografía</label>
        <textarea
          type="text"
          class="input"
          id="bio"
          placeholder="Tu biografía"
          v-model="formData.bio"
        >
        </textarea>
      </div>      
      <div>
        <label for="career" class="label">Carrera</label>
        <input
          type="text"
          class="input"
          id="career"
          placeholder="Tu carrera"
          v-model="formData.career"
        />
      </div>
      <!-- redireccionamos a perfil -->
      <AppButton type="submit">Guardar cambios</AppButton>
    </form>
  </div>
</template>