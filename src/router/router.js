import { createRouter, createWebHistory } from 'vue-router';
import { subscribeToAuthStateChanges } from '../services/auth';
import Home from '../pages/Home.vue';
import GlobalChat from '../pages/GlobalChat.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Profile from '../pages/Profile.vue';
import ProfileEdit from '../pages/ProfileEdit.vue';
import News from '../pages/News.vue';

const routes = [
    {         path: '/',              component: Home },
    {         path: '/Login',         component: Login },
    {         path: '/Register',      component: Register },
    {         path: '/Chat',          component: GlobalChat, meta: { requiresAuth: true } },
    {         path: '/Profile',       component: Profile, meta: { requiresAuth: true } },
    {         path: '/ProfileEdit',   component: ProfileEdit, meta: { requiresAuth: true } },
    {         path: '/News',          component: News },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
});

let user = {
    id: null,
    email: null,
}

subscribeToAuthStateChanges(userState => {
    user = userState;
});
router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && user.id === null) {
        return '/login' ;
    }
});

export default router;