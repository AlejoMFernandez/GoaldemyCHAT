<script>
import { RouterLink } from 'vue-router';
import AppH1 from '../components/AppH1.vue';
import { subscribeToAuthStateChanges } from '../services/auth';

let unsubscribeAuth = () => {};

export default {
  name: 'Profile',
  components: {
    AppH1
  },
  data() {
    return {
      user: {
        id: null,
        email: null,
        display_name: null,
        bio: null,
        career: null,
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
  mounted() {
    unsubscribeAuth = subscribeToAuthStateChanges(async userState => {
      this.user = userState;
    });
  },
  unmounted() {
    unsubscribeAuth();
  }
}
</script>

<template>
  <div class="mx-auto max-w-3xl">

    <div class="mb-4">
      <AppH1>Mi Perfil</AppH1>
      <RouterLink to="/profileedit" class="text-sm text-blue-500 hover:underline">Editar perfil</RouterLink>
    </div>
    <!-- Header card -->
    <section class="card card-hover p-6 mb-6 flex items-center gap-4 animate-[fade-in_500ms_ease_forwards] opacity-0">
      <div class="relative grid place-items-center size-16 rounded-2xl bg-gradient-to-br from-[oklch(0.70_0.21_270)] to-[oklch(0.55_0.21_270)] text-white font-extrabold text-xl shadow-lg">
        <span>{{ avatarInitial }}</span>
      </div>
      <div class="min-w-0">
        <p class="text-sm uppercase tracking-wide text-slate-400">Usuario</p>
        <p class="truncate text-lg font-semibold text-white">{{ user.email || '—' }}</p>
      </div>
    </section>

    <!-- Details grid -->
    <section class="grid gap-4 md:grid-cols-2">

      <!-- Correo electrónico -->
      <div class="card p-4 animate-[fade-in_500ms_ease_100ms_forwards] opacity-0">
        <p class="text-xs uppercase tracking-wide text-slate-400">Correo electrónico</p>
        <p class="mt-1 text-slate-100">{{ user.email || '—' }}</p>
      </div>

      <!-- Nombre para mostrar -->
      <div class="card p-4 animate-[fade-in_500ms_ease_150ms_forwards] opacity-0">
        <p class="text-xs uppercase tracking-wide text-slate-400">Nombre para mostrar</p>
        <p class="mt-1 text-slate-100">{{ user.display_name }}</p>
      </div>

      <!-- Carrera -->
      <div class="card p-4 animate-[fade-in_500ms_ease_200ms_forwards] opacity-0">
        <p class="text-xs uppercase tracking-wide text-slate-400">Carrera</p>
        <p class="mt-1 text-slate-100">{{ user.career || 'No establecida' }}</p>
      </div>

      <!-- Biografía (ocupa dos columnas en desktop) -->
      <div class="card p-4 md:col-span-2 animate-[fade-in_500ms_ease_250ms_forwards] opacity-0">
        <p class="text-xs uppercase tracking-wide text-slate-400">Biografía</p>
        <p class="mt-1 whitespace-pre-line text-slate-100">{{ user.bio || 'No establecida' }}</p>
      </div>

    </section>
  </div>
</template>