<script>
import AppH1 from '../components/AppH1.vue';
import AppButton from '../components/AppButton.vue';
import { fetchLastNews, saveNew, suscribeToNews } from '../services/news';
import { subscribeToAuthStateChanges } from '../services/auth';

let unsubscribeAuth = () => {};
let unsubscribeChat = () => {};

export default {
  name: 'News',
  components: {
    AppH1,
    AppButton
  },
  data() {
    return {
      noticias: [],
      newNoticia: {
        title: '',
        body: '',
      },
      user: {
        id: '',
        email: ''
      }
    };
  },
  methods: {
    async handleSubmit() {
      saveNew({
        sender_id: this.user.id,
        email: this.user.email,
        title: this.newNoticia.title,
        body: this.newNoticia.body,
      })
      // Limpiar formulario
      this.newNoticia.title = '';
      this.newNoticia.body = '';
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      return new Date(dateStr).toLocaleString([], {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    verMas(noticia) {
      alert(`Proximamente...`);
    }
  },
  async mounted() {
    unsubscribeAuth = subscribeToAuthStateChanges(userState => this.user = userState);

    unsubscribeChat = suscribeToNews(async newNoticia => {
      try {
        this.noticias.push(newNoticia);
        await this.$nextTick();
      } catch (error) {
        console.error(error);
      }
    });

    this.noticias = await fetchLastNews();
  },
  unmounted() {
    unsubscribeAuth();
    unsubscribeChat();
  }
};
</script>

<template>
  <div>
    <AppH1>Noticias</AppH1>
    <div class="flex flex-col md:flex-row gap-6">
      <section class="w-full md:w-9/12 p-2">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <article
            v-for="noticia in noticias"
            :key="noticia.id"
            class="card w-full h-full flex flex-col rounded-xl border border-white/10 bg-white/5 p-4 text-slate-100 shadow-sm"
          >
            <h3 class="text-md font-semibold text-slate-100">{{ noticia.title }}</h3>
            <p class="mt-2 whitespace-pre-line text-slate-200 text-xs">{{ noticia.body }}</p>
            <div class="mt-4 text-xs text-slate-400 flex align-center flex-col mb-3">
              <span><strong class="text-slate-300">{{ user.email }}</strong></span>
              <time>{{ formatDate(noticia.created_at) }}</time>
            </div>
            <AppButton type="button" class="mt-auto p-2 text-xs" @click="verMas(noticia)">Ver más</AppButton>
          </article>
        </div>
      </section>
      <!-- si no esta authenticado un usuario ocultar este section -->
      <section class="md:w-3/12 w-full" v-if="user.id">
        <h2 class="mb-4 text-2xl">Enviar noticia</h2>
        <form action="#" @submit.prevent="handleSubmit" class="card card-hover p-4 space-y-4">
          <div>
            <span class="label">Correo electrónico</span>
            {{ user.email }}
          </div>
          <div>
            <label for="title" class="label">Título</label>
            <input
              required
              id="title"
              class="input"
              placeholder="Escribe el título de tu noticia"
              v-model="newNoticia.title"
            />
          </div>
          <div>
            <label for="body" class="label">Cuerpo</label>
            <textarea
              required
              id="body"
              class="input min-h-30"
              placeholder="Escribe el cuerpo de tu noticia"
              v-model="newNoticia.body"
            ></textarea>
          </div>
          <AppButton type="submit">Enviar</AppButton>
        </form>
      </section>
    </div>
  </div>
</template>