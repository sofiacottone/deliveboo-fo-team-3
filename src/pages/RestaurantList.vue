<script>

import axios from 'axios';

export default {
    name: 'AppRestaurantList',

    data() {
        return {
            restaurants: [],
        }
    },

    methods: {

        getRestaurantList() {
            axios.get('http://127.0.0.1:8000/api/restaurants')
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
        <h1>Ciao sono Ristoranti</h1>
        <div class="row">
            <div class="col my-3" v-for="restaurant in restaurants">
                <div class="card" style="width: 18rem;">
                    <!-- <img src="..." class="card-img-top" alt="..."> -->
                    <div class="card-body">
                        <h5 class="card-title">{{ restaurant.restaurant_name}}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>