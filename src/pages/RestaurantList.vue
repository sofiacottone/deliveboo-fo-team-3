<script>

import axios from 'axios';
import { store } from '../store.js';
import RestaurantCard from '../components/RestaurantCard.vue';

export default {
    name: 'RestaurantList',
    components: {
        RestaurantCard
    },

    data() {
        return {
            restaurants: [],
            store,
        }
    },

    methods: {

        getRestaurantList() {
            axios.get(`${this.store.apiBaseUrl}/api/restaurants`)
                .then((response) => {
                    this.restaurants = response.data.results;
                })
        }
    },

    mounted() {
        this.getRestaurantList()
    }
}
</script>

<template>
    <div class="container py-3">
        <h3>I nostri ristoranti in tutta Roma</h3>
        <div class="row row-cols-4">
            <div class="col my-3" v-for="restaurant in restaurants" :key="restaurant.id">
                <RestaurantCard :restaurantDetail="restaurant"></RestaurantCard>
            </div>
        </div>
    </div>

</template>