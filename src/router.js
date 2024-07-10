import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppAbout from './pages/AppAbout.vue';
import RestaurantList from './pages/RestaurantList.vue';
import SingleRestaurant from './pages/SingleRestaurant.vue';
import AppCheckout from './pages/AppCheckout.vue';
import AppPayments from './pages/AppPayments.vue';
import OrderConfirm from './pages/OrderConfirm.vue';

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
            path: '/ristoranti/:slug',
            name: 'single-restaurant',
            component: SingleRestaurant
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: AppCheckout
        },
        {
            path: '/checkout/payments',
            name: 'payments',
            component: AppPayments
        },
        {
            path: '/checkout/payments/confirm',
            name: 'order-confirm',
            component: OrderConfirm
        },
    ]
});
export { router };