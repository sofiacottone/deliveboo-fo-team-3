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
            <a href="#" class="btn btn-primary">Ordina qui</a>
        </div>
    </div>

</template>