<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'SingleRestaurant',

    data() {
        return {
            store,
            restaurant: {},
        }
    },

    methods: {
        getSingleRestaurant() {
            axios.get(`${this.store.apiBaseUrl}/api/restaurants/${this.$route.params.slug}`)
                .then((response) => {
                    this.restaurant = response.data.results;
                    console.log(this.restaurant);
                });
        },

        getImageUrl(name) {
            return new URL(`../assets/img/${name}`, import.meta.url).href;
        },
        hasHistory() {
            return window.history.length > 2
        }
    },

    mounted() {
        this.getSingleRestaurant();
        console.log(this.store.apiBaseUrl + '/storage');
    },
}

</script>

<template>
    <div class="container py-3">
        <div class="row justify-content-center align-items-center border-bottom p-2">
            <div class="pb-3 ms-primary" @click="hasHistory() ? $router.go(-1) : $router.push('/')" role="button">
                <i class="fa-solid fa-arrow-left"></i>
                Indietro
            </div>
            <img :src="restaurant.image ? `${this.store.apiBaseUrl}/storage/${restaurant.image}` : getImageUrl('fast-food.webp')"
                class="card-img-top w-50" :alt="restaurant.restaurant_name">
            <div class="col-6 ">
                <h2>{{ restaurant.restaurant_name }}</h2>
                <p>{{ restaurant.description }}</p>
                <i class="fa-solid fa-location-dot"></i> <span> {{ restaurant.address }}</span>
            </div>
        </div>
        <div class="row p-2 pt-3">
            <h2>Piatti</h2>
            <div class="hstack gap-3">
                <div class="col-3 border rounded h-100 pb-2" v-for=" dish  in  restaurant.dishes ">
                    <img :src="dish.image ? `${this.store.apiBaseUrl}/storage/${dish.image}` : getImageUrl('fast-food.webp')"
                        class="card-img-top rounded-top ms-dish-img" :alt="dish.name">
                    <div class="py-2 text-center fw-bold">{{ dish.name }}</div>
                    <div class="d-flex justify-content-center align-items-center gap-2 px-2">
                        <div class="border rounded w-75 text-center ms-primary" role="button">
                            <i class="fa-solid fa-trash p-1"></i>
                        </div>
                        <div class="border rounded w-75 text-center ms-primary" role="button">
                            <i class="fa-solid fa-plus p-1"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../style/generic';
@use '../style/partials/variables' as *;

.ms-dish-img {
    height: 90px;
    max-width: 100%;
    object-fit: cover;
    object-position: center;
}

.ms-primary {
    color: $primary-color;
}
</style>