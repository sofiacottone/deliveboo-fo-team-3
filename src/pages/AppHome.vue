<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'AppHome',
    data() {
        return {
            store,
            restaurants: [],
            queryParams: {
                category: ''
            },
            selectedCategories: [],
            categories: [],
            categoryListIntern: [
                {
                    name: 'pizza',
                    flag: '🍕'
                },
                {
                    name: 'messicano',
                    flag: '🌮'
                },
                {
                    name: 'vietnamita',
                    flag: '🧆'
                },
                {
                    name: 'indiano',
                    flag: '🍛'
                },
                {
                    name: 'thailandese',
                    flag: '🍜'
                },
                {
                    name: 'coreano',
                    flag: '🍡'
                },
                {
                    name: 'francese',
                    flag: '🍳'
                },
                {
                    name: 'greco',
                    flag: '🏛️'
                },
                {
                    name: 'giapponese',
                    flag: '🍣'
                },
                {
                    name: 'cinese',
                    flag: '🥡'
                },
                {
                    name: 'italiano',
                    flag: '🍝'
                },
            ],
        }
    },

    methods: {
        getRestaurantList() {
            if (this.selectedCategories == []) {
                this.queryParams.category = undefined;
            } else {
                this.queryParams.category = this.selectedCategories;
            };

            axios.get(`${this.store.apiBaseUrl}/api/restaurants`, {
                params: this.queryParams
            })
                .then((response) => {
                    this.restaurants = response.data.results;
                });
        },
        getCategoryList() {
            axios.get(`${this.store.apiBaseUrl}/api/categories`)
                .then((response) => {
                    this.categories = response.data.results;
                });
        },
    },
    mounted() {
        this.getRestaurantList();
        this.getCategoryList();
    }
}
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col">
                <h3 class="text-center py-3">Scegli il ristorante in base alla categoria</h3>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-9 d-flex flex-wrap gap-3 justify-content-center">
                <div v-for="category in categories">
                    <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input @change="getRestaurantList" v-model="selectedCategories" :value="category.name"
                            type="checkbox" class="btn-check" :id="category.name" name="category">
                        <label class="btn btn-outline-primary" :for="category.name">
                            <span v-for="categoryIntern in categoryListIntern">
                                <span class="ms-icon-category" v-if="categoryIntern.name === category.name">{{
                    categoryIntern.flag }}</span>
                            </span>
                            {{ category.name }}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container py-3">
        <div class="row row-cols-3 flex-row">
            <template v-if="selectedCategories.length > 0">
                <div class="col mb-3" v-for="restaurant in restaurants">
                    <div class="card w-100 h-100">
                        <!-- <img :src="restaurant.image ? category.image : getImageUrl('fast-food.webp')" class="card-img-top" alt="{{ restaurant.restaurant_name }}"> -->
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">{{ restaurant.restaurant_name }}</h5>
                                <div>
                                    <template v-for="category in restaurant.categories">
                                        <span class="badge mx-1">{{ category.name }}</span>
                                    </template>
                                </div>
                            </div>
                            <router-link :to="{ name: 'single-restaurant', params: { slug: restaurant.slug } }">
                                <button class="ms-btn-custom">Ordina qui</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="d-flex justify-content-center mt-4" v-if="selectedCategories.length > 0 && restaurants.length == 0">
            <div>Nessun ristorante trovato con le categorie selezionate.</div>
        </div>
        <div class="d-flex justify-content-center mt-4" v-if="selectedCategories.length > 0 && filteredRestaurants.length == 0">
                <div>Nessun ristorante trovato con le categorie selezionate.</div>
        </div>
    </div>
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

.ms-icon-category {
    font-size: 30px;
}

.badge {
    background-color: $primary-color;
}
.btn-check:checked + .btn[data-v-70286e62] {
     background-color: $primary-color;
     border-color: #fff;
 }
 .btn-outline-primary[data-v-70286e62] {
    border-color: $primary-color;
    color: $primary-color;
    
    
    &:hover {
        transition: transform 0.7s ease;
        background-color: $primary-color;
        color: #fff;
        transform: scale(1.1);
        border-color: $primary-color;
    }
 }
</style>