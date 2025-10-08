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
  <div class="space-y-12">

    <section class="flex pt-20 pb-20 px-50 place-items-center">
      <div class="space-y-5">
        <AppH1>Goaldemy</AppH1>
        <p class="text-slate-300 text-lg leading-relaxed">
          Tu espacio para vivir el fútbol todos los días: enterate de las últimas
          noticias, debatí las jugadas más calientes y conectá con la comunidad.
        </p>
        <div class="flex flex-wrap gap-3 pt-2">
          <RouterLink
            to="/News"
            class="rounded-xl bg-[oklch(0.62_0.21_270)] px-5 py-2.5 font-semibold text-white transition hover:bg-[oklch(0.55_0.21_270)]"
          >
            Ver noticias futboleras
          </RouterLink>
          <RouterLink
            to="/Chat"
            class="rounded-xl border border-white/10 px-5 py-2.5 font-semibold text-slate-200 transition hover:border-white/20 hover:text-white"
          >
            Hablar de fútbol
          </RouterLink>
        </div>
      </div>
      <div class="w-full flex justify-center">
        <img
          src="/logogoaldemy.png"
          alt="Goaldemy"
          class="max-w-[120px] w-full opacity-90 drop-shadow-lg select-none"
        />
      </div>
    </section>

    <section class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <article class="card card-hover p-5 rounded-xl border border-white/10 bg-white/5">
        <h3 class="text-xl font-semibold text-white">Noticias al instante</h3>
        <p class="mt-2 text-slate-300">
          Resúmenes, partes médicos, análisis tácticos y todo lo que pasa en tu club.
        </p>
        <RouterLink to="/News" class="inline-block mt-4 text-indigo-300 hover:text-indigo-200 font-semibold">
          Ver noticias →
        </RouterLink>
      </article>

      <article class="card card-hover p-5 rounded-xl border border-white/10 bg-white/5">
        <h3 class="text-xl font-semibold text-white">Charla de fútbol</h3>
        <p class="mt-2 text-slate-300">
          Sumate al chat global y opiná sobre goles, polémicas y fichajes.
        </p>
        <RouterLink to="/Chat" class="inline-block mt-4 text-indigo-300 hover:text-indigo-2 00 font-semibold">
          Ir al chat →
        </RouterLink>
      </article>

      <article class="card card-hover p-5 rounded-xl border border-white/10 bg-white/5">
        <h3 class="text-xl font-semibold text-white">Tu perfil</h3>
        <p class="mt-2 text-slate-300">
          Personalizá tu cuenta y mostrá de qué club sos. ¡La comunidad te espera!
        </p>
        <RouterLink to="/Profile" class="inline-block mt-4 text-indigo-300 hover:text-indigo-200 font-semibold">
          Ver mi perfil →
        </RouterLink>
      </article>
    </section>

  </div>
</template>