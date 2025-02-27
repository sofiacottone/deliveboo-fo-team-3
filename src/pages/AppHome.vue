<script>
import axios from 'axios';
import { store } from '../store.js';
import RestaurantCard from '../components/RestaurantCard.vue';

export default {
    name: 'AppHome',
    components: {
        RestaurantCard
    },
    data() {
        return {
            store,
            restaurants: [],
            queryParams: {
                categories: []
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
            loading: false
        }
    },

    methods: {
        getRestaurantList() {
            this.loading = true
            if (this.selectedCategories.length == 0) {
                this.queryParams.categories = undefined;
            } else {
                this.queryParams.categories = this.selectedCategories;
            };
            console.log(this.queryParams.categories);
            axios.get(`${this.store.apiBaseUrl}/api/restaurants`, {
                params: this.queryParams
            })
                .then((response) => {
                    this.restaurants = response.data.results;
                    this.loading = false
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

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" :id="category.name" v-model="selectedCategories"
                            name="categoryCheck" @change="getRestaurantList" :value="category.name">
                        <label class="form-check-label" :for="category.name">
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
        <div class="row row-cols-md-3 flex-row">
            <template v-if="selectedCategories.length > 0">
                <div v-if="loading">
                    <div class="card" aria-hidden="true">
                        <div class="card-body">
                            <h5 class="card-title placeholder-glow">
                                <span class="placeholder col-6"></span>
                            </h5>
                            <p class="card-text placeholder-glow">
                                <span class="placeholder col-7"></span>
                                <span class="placeholder col-4"></span>
                                <span class="placeholder col-4"></span>
                                <span class="placeholder col-6"></span>
                                <span class="placeholder col-8"></span>
                            </p>
                            <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 my-3" v-else v-for="restaurant in restaurants"
                    :key="restaurant.id">
                    <RestaurantCard :restaurantDetail="restaurant"></RestaurantCard>
                </div>
            </template>
        </div>
        <div class="d-flex justify-content-center mt-4" v-if="selectedCategories.length > 0 && restaurants.length == 0">
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

.btn-check:checked+.btn[data-v-70286e62] {
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

@media screen and (max-width: 1920px) {
    .ms-block-element {
        display: flex;
    }

}

@media screen and (min-width: 577px) {

    .form-check {
        display: none;
    }

}

@media screen and (max-width: 576px) {
    .ms-block-element {
        display: block;

        span {
            margin-top: 6px;
            margin-bottom: 6px;
        }
    }

    .btn-group {
        display: none;
    }

    .form-check {
        display: inline-block;
    }

}
</style>