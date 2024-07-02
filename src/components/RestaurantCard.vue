<script>

    export default {
        name: 'RestaurantCard',
        props: {
            restaurantDetail: Object
        },
    }

</script>

<template>

    <div class="card" style="width: 18rem;">
        <!-- <img src="..." class="card-img-top" alt="..."> -->
        <div class="card-body">
            <h5 class="card-title">{{ restaurantDetail.restaurant_name}}</h5>
            <p class="card-text">{{ restaurantDetail.description }}</p>
            <router-link :to="{ name: 'single-restaurant', params: {slug: restaurantDetail.slug} }">Ordina qui</router-link>
        </div>
    </div>

</template>