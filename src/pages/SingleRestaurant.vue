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
                });
            },

            getImageUrl(name) {
                return new URL(`../assets/img/${name}`, import.meta.url).href;
            }
        },

        mounted() {
            this.getSingleRestaurant(); 
        },
    }

</script>

<template>
    <div class="container py-3">
        <div class="row justify-content-center align-items-center">
            <img :src="restaurant.image ? restaurant.image : getImageUrl('fast-food.webp')" class="card-img-top w-50" alt="{{ restaurant.restaurant_name }}">
            <div class="col-6 ">
                <h2>{{ restaurant.restaurant_name }}</h2>
                <p>{{ restaurant.description }}</p>
                <i class="fa-solid fa-location-dot"></i> <span> {{ restaurant.address }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>