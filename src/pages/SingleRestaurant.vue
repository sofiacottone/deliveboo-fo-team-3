<script>
import axios from 'axios';
import { store } from '../store.js';
import ShoppingCart from '../components/ShoppingCart.vue';
import Modal from 'bootstrap/js/dist/modal';

export default {
    name: 'SingleRestaurant',
    components: {
        ShoppingCart
    },
    data() {
        return {
            store,
            restaurant: {},
            cart: [],
            selectedDish: null,
            showNewCartModal: false,
            currentDish: null
        }
    },
    methods: {
        getSingleRestaurant() {
            axios.get(`${this.store.apiBaseUrl}/api/restaurants/${this.$route.params.slug}`)
                .then((response) => {
                    this.restaurant = response.data.results;
                    store.currentRestaurant = this.restaurant.id;
                    // console.log(this.restaurant);
                });
        },

        getImageUrl(name) {
            return new URL(`../assets/img/${name}`, import.meta.url).href;
        },
        hasHistory() {
            return window.history.length > 2
        },
        handleAddDishOnCart(dish, restaurant) {
            console.log('Attempting to add dish:', dish);
            console.log('Current cart:', store.cart);
            console.log('Current restaurant:', store.currentRestaurant);
            const existingDish = store.cart.find(item => item.id === dish.id);
            if (existingDish) {
                this.addDishOnCart(dish, restaurant);
            } else if (store.cart.length > 0 && store.cart[0].restaurant.id !== store.currentRestaurant) {
                this.currentDish = dish;
                console.log('current dish:', this.currentDish);
                this.showNewCartModal = true;
                console.log(this.showNewCartModal);
                console.log('cart rest', store.cart[0].restaurant.id);
                console.log('curr rest', store.currentRestaurant);
                const modal = new Modal(document.getElementById('changeCartModal'));
                modal.show();
            } else {
                this.addDishOnCart(dish, restaurant);
            }
        },
        addDishOnCart(dish, restaurant) {
            const existingDish = store.cart.find(item => item.id === dish.id);
            if (existingDish) {
                existingDish.quantity++;
                store.newPriceArray[dish.id] = existingDish.price * existingDish.quantity;
                store.totalPrice += existingDish.price;
            } else {
                const cartItem = {
                    id: dish.id,
                    name: dish.name,
                    price: dish.price,
                    quantity: 1,
                    restaurant: restaurant
                };
                store.cart.push(cartItem);
                store.newPriceArray[dish.id] = cartItem.price * cartItem.quantity;
                store.totalPrice += cartItem.price;
            }

            store.totalPrice = store.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

            this.storeCart();
        },
        selectDish(dish) {
            this.selectedDish = dish;
        },

        removeDishOnCart(dish) {
            const existingDish = store.cart.find(item => item.id === dish.id);
            if (existingDish) {
                if (existingDish.quantity > 1) {
                    existingDish.quantity--;
                    store.newPriceArray[dish.id] = existingDish.price * existingDish.quantity;
                    store.totalPrice -= existingDish.price;
                } else {
                    const index = store.cart.findIndex(item => item.id === dish.id);
                    store.totalPrice -= existingDish.price * existingDish.quantity;
                    if (index !== -1) {
                        store.cart.splice(index, 1);
                        delete store.newPriceArray[dish.id];

                    }
                }
            }
            this.storeCart();
        },
        storeCart() {
            localStorage.setItem('products', JSON.stringify(store.cart));
            localStorage.setItem('total price', JSON.stringify(store.totalPrice));
            localStorage.setItem('restaurant ID', JSON.stringify(this.restaurant.id));
            localStorage.setItem('single price', JSON.stringify(store.newPriceArray));
        },
        clearCart() {
            store.cart = [];
            store.totalPrice = 0;
            this.storeCart();
        },
        changeRestaurantModal() {
            if (store.cart.length > 0 && store.cart[0].restaurant.id !== store.currentRestaurant) {
                this.showNewCartModal = true;
                console.log(this.showNewCartModal);
                console.log('new rest', store.cart[0].restaurant.id);
                console.log('curr rest', store.currentRestaurant);
            }
        }
    },


    mounted() {
        this.getSingleRestaurant();
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
                <div v-for="category in restaurant.categories">
                    <span class="badge mx-1">{{ category.name }}</span>
                </div>
            </div>
        </div>
        <div class="row p-2 pt-3">
            <div class="d-flex justify-content-between">
                <div class="col-lg-9 col-md-12 col-sm-12">
                    <h2>Piatti</h2>
                    <div class="hstack gap-3 flex-wrap ms-justify-center">
                        <template v-for="dish in restaurant.dishes">
                            <div class="col-lg-3 col-md-5 col-sm-12 border rounded h-100 ms-single-dish"
                                v-if="dish.visibility == 1" :key="dish.id" @click="selectDish(dish)">
                                <div class="border rounded ms-dish-card ">
                                    <!-- div bersaglio modale  -->
                                    <div data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="ms-card-text">
                                        <img :src="dish.image ? `${this.store.apiBaseUrl}/storage/${dish.image}` : getImageUrl('fast-food.webp')"
                                            class="card-img-top ms-rounded ms-dish-img" :alt="dish.name">
                                        <div class="col-sm-8">
                                            <div class="py-2 px-2 fw-bold" data-dish-name="{{dish.name}}">{{ dish.name
                                                }}
                                            </div>
                                            <div class="py-1 px-2 fw-bold">{{ dish.price.replace(".", ',') }} €</div>
                                        </div>
                                    </div>


                                    <div
                                        class="d-flex justify-content-center align-items-center gap-2 ms-card-button m-2">
                                        <div class="ms-button-border w-75 text-center ms-primary text-center ms-primary h-100 d-flex justify-content-center align-items-center"
                                            role="button" v-if="store.cart.find(item => item.id === dish.id)"
                                            @click="removeDishOnCart(dish)">
                                            <i class="fa-solid fa-minus py-1 px-2"></i>
                                        </div>
                                        <div class="ms-button-border w-75 text-center ms-primary h-100 d-flex justify-content-center align-items-center"
                                            role="button" @click="handleAddDishOnCart(dish, restaurant)">
                                            <i class="fa-solid fa-plus py-1 px-2"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="ms-shop-cart-small">
                    <ShoppingCart :restaurant="restaurant"></ShoppingCart>
                </div>
            </div>
        </div>
        <div class="ms-shop-cart-big">
            <ShoppingCart :restaurant="restaurant"></ShoppingCart>
        </div>

    </div>
    <!-- Modal to add dish to cart -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ selectedDish ? selectedDish.name : ''
                        }}
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card-img-top rounded-top">
                        <img :src="selectedDish && selectedDish.image ? `${store.apiBaseUrl}/storage/${selectedDish.image}` : getImageUrl('fast-food.webp')"
                            :alt="selectedDish ? selectedDish.name : ''" class="ms-img-style ms-dish-img">

                    </div>
                    <p v-if="selectedDish">{{ selectedDish.description }}</p>
                    <h3 v-if="selectedDish">{{ selectedDish.price.replace(".", ',') }} €</h3>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Chiudi</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click="addDishOnCart(selectedDish)">Aggiungi al
                        carrello</button>

                </div>
            </div>
        </div>
    </div>

    <!-- Modal to change restaurant cart -->
    <div v-if="store.cart.length > 0" v-show="showNewCartModal" @close="showNewCartModal = false">
        <div class="modal fade" id="changeCartModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="changeCartModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="changeCartModalLabel">Vuoi creare un nuovo carrello?
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>
                            In questo modo cancelli il carrello esistente da
                            {{ store.cart[0].restaurant.restaurant_name }} e crei un nuovo carrello da
                            {{ restaurant.restaurant_name }}.
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                            @click="clearCart(); addDishOnCart(currentDish, restaurant)">Nuovo
                            carrello</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../style/generic';
@use '../style/partials/variables' as *;

.ms-dish-img {
    object-fit: cover;
    object-position: center;
}

.ms-primary {
    color: $primary-color;
}

.badge {
    background-color: $primary-color;
}

.ms-card-button {
    position: absolute;
}

.ms-dish-card {
    position: relative;
}

// MEDIA QUEARY
@media screen and (max-width: 4000px) {
    .ms-rounded {
        border-top-left-radius: 0.375rem;
        border-top-right-radius: 0.375rem;
    }

    .ms-shop-cart-small {
        display: block;
    }

    .ms-shop-cart-big {
        display: none;
    }

    .ms-button-border {
        border: 1px solid #dee2e6;
        border-radius: 0.375rem;
    }

    .ms-dish-img {
        height: 90px;
        max-width: 100%;
    }

    .ms-dish-card {
        height: 240px;
    }

    .ms-card-button {
        width: 80%;
        bottom: 10px;
        left: 50%;
        transform: translate(-50%)
    }
}

@media screen and (max-width: 992px) {
    .ms-rounded {
        border-top-left-radius: 0.375rem;
        border-top-right-radius: 0.375rem;
    }

    .ms-shop-cart-small {
        display: block;
    }

    .ms-shop-cart-big {
        display: none;
    }

    .ms-button-border {
        border: 1px solid #dee2e6;
        border-radius: 0.375rem;
    }

    .ms-dish-img {
        height: 90px;
        max-width: 100%;
    }
}

// @media screen and (max-width: 768px) and (min-width: 577px) {
//     .ms-rounded {
//         border-top-left-radius: 0.375rem;
//         border-top-right-radius: 0.375rem;
//     }

//     .ms-shop-cart-small {
//         display: none;
//     }

//     .ms-shop-cart-big {
//         display: block;
//     }

//     .ms-button-border {
//         border: 1px solid #dee2e6;
//         border-radius: 0.375rem;
//     }

//     .ms-justify-center {
//         justify-content: center;
//     }

//     .ms-dish-img {
//         height: 90px;
//         max-width: 100%;
//     }

//     .ms-card-button {
//         left: 50%;
//         bottom: 10px;
//         width: 80%;
//         transform: translate(-50%);
//     }

// }

@media screen and (max-width: 768px) {
    .ms-dish-card {
        display: flex;
        justify-content: space-between;
        height: 100%;
        position: relative;

        .ms-button-border {
            border: none;
        }
    }

    .ms-single-dish {
        width: 100%;
    }



    .ms-card-text {
        display: flex;
        justify-content: space-between;
    }

    .ms-rounded {
        border-top-left-radius: 0.375rem;
        border-bottom-left-radius: 0.375rem;
        border-top-right-radius: 0rem;
    }

    .ms-shop-cart-small {
        display: none;
    }

    .ms-shop-cart-big {
        display: block;
    }

    .ms-dish-img {
        height: 110px;
        min-width: 200px;
        max-width: 200px;
    }

    .ms-card-button {
        flex-direction: column-reverse;
        width: fit-content;
        position: absolute;
        bottom: 14px;
        right: 10px;
    }
}
</style>