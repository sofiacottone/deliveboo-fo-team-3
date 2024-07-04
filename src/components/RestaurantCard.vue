<script>
import { store } from '../store.js';

export default {
    name: 'RestaurantCard',
    props: {
        restaurantDetail: Object
    },

    data() {
        return {
            store
        }
    },
    methods: {
        getImageUrl(name) {
            return new URL(`../assets/img/${name}`, import.meta.url).href;
        },
    }
}

</script>

<template>
    <router-link :to="{ name: 'single-restaurant', params: { slug: restaurantDetail.slug } }">
        <div class="card w-100 h-100">
            <img class="card-img-top"
                :src="restaurantDetail.image ? `${this.store.apiBaseUrl}/storage/${restaurantDetail.image}` : getImageUrl('fast-food.webp')">
            <div class="card-body">
                <h5 class="card-title">{{ restaurantDetail.restaurant_name }}</h5>
                <button class="ms-btn-custom">Ordina qui</button>
            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
@use '../style/generic';
@use '../style/partials/variables' as *;

.ms-btn-custom {
    background-color: #fff;
    font-family: $secondary-font;
    text-transform: uppercase;
    color: $primary-color;
    text-decoration: none;
    padding: 8px 8px 4px;
    border-radius: 8px;
    box-shadow: inset 0 1px 0 #ffffff26, 0 1px 1px #00000013;
    border: 2px solid $primary-color;
    transition: transform 0.5s ease;

    &:hover {
        background-color: $primary-color;
        color: #fff;
        transform: scale(1.1);
    }
}

.card-img-top {
    max-height: 170px;
    object-fit: cover;
    object-position: center;
}
</style>