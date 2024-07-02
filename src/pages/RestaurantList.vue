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
                console.log(this.restaurants);
            })
        }
    },

    mounted() {
        this.getRestaurantList()
    }
}
</script>

<template>
    <div class="container">
        <h3>I nostri ristoranti in tutta Roma</h3>
        <div class="row">
            <div class="col my-3" v-for="restaurant in restaurants" :key="restaurant.id">
                <RestaurantCard :restaurantDetail="restaurant"></RestaurantCard>
                <!-- <div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ restaurant.restaurant_name}}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div> -->

            </div>
        </div>
    </div>
    
</template>