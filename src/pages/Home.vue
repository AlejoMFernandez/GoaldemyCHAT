<script>
import AppH1 from '../components/AppH1.vue';

export default {
  name: 'Home',
  components: {
    AppH1
  }
}
</script>

<template>
  <section class="grid place-items-center h-full">
    <div class="space-y-4">
      <AppH1>¡Hola!</AppH1>
      <p class="text-slate-300">Esta es la página de inicio.</p>
      <div class="flex gap-3 pt-2">
        <RouterLink to="/chat" class="rounded-xl bg-[oklch(0.62_0.21_270)] px-5 py-2.5 font-semibold text-white transition hover:bg-[oklch(0.55_0.21_270)]">Ir al Chat</RouterLink>
        <RouterLink to="/register" class="rounded-xl border border-white/10 px-5 py-2.5 font-semibold text-slate-200 transition hover:border-white/20 hover:text-white">Crear cuenta</RouterLink>
      </div>
    </div>
  </section>
</template>