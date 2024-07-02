import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppAbout from './pages/AppAbout.vue';
import RestaurantList from './pages/RestaurantList.vue';
import AppCheckout from './pages/AppCheckout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/chi-siamo',
            name: 'about',
            component: AppAbout
        },
        {
            path: '/ristoranti',
            name: 'restaurants',
            component: RestaurantList
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: AppCheckout
        },
    ]
});
export { router };