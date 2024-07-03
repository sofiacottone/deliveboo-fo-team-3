<script>

import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'AppHome',

    data() {
        return {
            store,
            restaurants: [],
            filteredRestaurants: [],
            selectedCategories: [],
            categories: [],
            categoryListIntern: [
                {
                    name: 'pizza',
                    flag: '🍝'
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
            ]
        }
    },

    methods: {

        getRestaurantList() {

            // const queryParams = {
            //     categories: this.selectedCategories.join(',')
            // }

            axios.get(`${this.store.apiBaseUrl}/api/restaurants`)
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

        updateCategories(event) {
            const category = event.target.value; // Ottiene il valore della categoria dalla checkbox
            if (event.target.checked) { // Se la checkbox è stata selezionata
                this.selectedCategories.push(category); // Aggiungi la categoria all'array delle categorie selezionate
            } else { // Se la checkbox è stata deselezionata
                const index = this.selectedCategories.indexOf(category); // Trova l'indice della categoria nell'array
                if (index > -1) { // Se la categoria è presente nell'array
                    this.selectedCategories.splice(index, 1); // Rimuovila dall'array
                }
            }
            this.filterRestaurants(); // Filtra i ristoranti in base alle categorie selezionate
        },

        filterRestaurants() {
            if (this.selectedCategories.length === 0) {
                this.filteredRestaurants = []; // Se non ci sono categorie selezionate, mostra un array vuoto
            } else {
                this.filteredRestaurants = this.restaurants.filter(restaurant => 
                    this.selectedCategories.every(selectedCategory => 
                        restaurant.categories.some(restaurantCategory => 
                            restaurantCategory.name === selectedCategory
                        )
                    )
                );
            }
        }
    },

    mounted() {
        this.getRestaurantList(),
        this.getCategoryList()
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
            <div class="col-8 d-flex flex-wrap gap-3 justify-content-center">
                <div v-for="category in categories">
                    <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input 
                        @change="updateCategories"
                        :value="category.name"
                        type="checkbox" class="btn-check" 
                        :id="category.name"
                        >
                        <label class="btn btn-outline-primary" :for="category.name">
                            <span v-for="categoryIntern in categoryListIntern">
                                <span class="ms-icon-category" v-if="categoryIntern.name === category.name">{{ categoryIntern.flag }}</span>
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
            <div class="col mb-3" v-for="restaurant in filteredRestaurants">
                <div class="card w-100 h-100">
                    <!-- <img :src="restaurant.image ? category.image : getImageUrl('fast-food.webp')" class="card-img-top" alt="{{ restaurant.restaurant_name }}"> -->
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <h5 class="card-title">{{ restaurant.restaurant_name }}</h5>
                            <div v-for="category in restaurant.categories">
                                <span class="badge text-bg-primary">{{ category.name }}</span>
                            </div>
                        </div>
                        <router-link :to="{ name: 'single-restaurant', params: {slug: restaurant.slug} }">
                            <button class="ms-btn-custom">Ordina qui</button> 
                        </router-link>
                    </div>
                </div>
            </div>
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

</style>