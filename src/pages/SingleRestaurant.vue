<script>
import axios from 'axios';
import { store } from '../store.js';
import ShoppingCart from '../components/ShoppingCart.vue';

export default {
    name: 'SingleRestaurant',
    components: {
        ShoppingCart
    },
    data() {
        return {
            store,
            restaurant: {},
            selectedDish: null,
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
        },
        selectDish(dish) {
            this.selectedDish = dish;
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
                <div v-for="category in restaurant.categories" :key="category.id">
                    <span class="badge mx-1">{{ category.name }}</span>
                </div>
            </div>
        </div>
        <div class="row p-2 pt-3">
            <div class="d-flex justify-content-between">
                <div class="col">
                    <h2>Piatti</h2>
                    <div class="hstack gap-3 flex-wrap">
                        <div class="col-3 border rounded h-100 pb-2" 
                             v-for="dish in restaurant.dishes"
                             :key="dish.id"
                             data-bs-toggle="modal"
                             data-bs-target="#staticBackdrop"
                             @click="selectDish(dish)">
                            <img :src="dish.image ? `${this.store.apiBaseUrl}/storage/${dish.image}` : getImageUrl('fast-food.webp')"
                                class="card-img-top rounded-top ms-dish-img" :alt="dish.name">
                            <div class="py-2 px-2 fw-bold">{{ dish.name }}</div>
                            <div class="py-2 px-2 fw-bold">{{ dish.price }} €</div>
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
                <ShoppingCart></ShoppingCart>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ selectedDish ? selectedDish.name : '' }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card-img-top rounded-top ">
                        <img :src="selectedDish && selectedDish.image ? `${store.apiBaseUrl}/storage/${selectedDish.image}` : getImageUrl('fast-food.webp')" :alt="selectedDish ? selectedDish.name : ''" class="ms-img-style ms-dish-img">

                    </div>
                    <p v-if="selectedDish">{{ selectedDish.description }}</p>
                    <h3 v-if="selectedDish">{{ selectedDish.price }} €</h3>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Chiudi</button>
                    <button type="button" class="btn btn-primary">Aggiungi al carrello</button>
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
        .ms-img-style{
            height: 200px;
    }
}

.ms-primary {
    color: $primary-color;
}

.badge {
    background-color: $primary-color;
}


</style>