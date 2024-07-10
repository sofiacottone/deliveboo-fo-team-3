<script>
import { store } from '../store.js';

export default {
    name: 'ShoppingCart',
    props: {
        dishes: Object,
    },

    data() {
        return {
            store,
        }
    },
    methods: {
        getImageUrl(name) {
            return new URL(`../assets/img/${name}`, import.meta.url).href;
        },
        clearCart() {
            store.cart = []
            store.totalPrice = 0

        },
        addDishOnCart(dish) {
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
                    quantity: 1
                };
                store.cart.push(cartItem);
                store.newPriceArray[dish.id] = cartItem.price * cartItem.quantity;
                store.totalPrice += cartItem.price;
            }

            store.totalPrice = store.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

            this.storeCart();
            // console.log(store.newPriceArray);
            // console.log(store.totalPrice);

        },
        storeCart() {
            localStorage.setItem('products', JSON.stringify(store.cart));
            localStorage.setItem('total price', JSON.stringify(store.totalPrice));
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

    },
    mounted() {
        console.log(store.storedProducts)
    }

}

</script>

<template>
    <div class=" border rounded-1 p-3 ms-cart my-3" v-if="store.storedProducts.length > 0">
        <div class="d-flex justify-content-between mb-3">
            <div class="fw-bold ">Il tuo ordine</div>
            <div data-bs-toggle="modal" data-bs-target="#confirmClearCart">
                <div class="ms-primary" role="button"><i class="fa-solid fa-trash p-1"></i></div>
            </div>
        </div>
        <div class="fw-bold pb-2 ">Carrello</div>
        <div class="border rounded-1 p-2 ms-inside-cart">
            <div class="d-flex justify-content-between border-bottom px-2 py-4" v-for="(dish, index) in store.cart">
                <!-- remove button -->
                <div>
                    <button type="button" @click="removeDishOnCart(dish)"
                        class="ms-button-border text-center px-2 text-center ms-primary h-100 d-flex justify-content-center align-items-center">-</button>
                </div>
                <div class="d-flex gap-3 ">
                    <div>{{ dish.quantity }}x</div>
                    <div>{{ dish.name }}</div>
                </div>
                <div class="d-flex gap-3 ">
                    <div v-if="dish.quantity == 1">{{ dish.price }} €</div>
                    <div v-else>{{ store.newPriceArray[dish.id].toFixed(2).replace(".", ',') }} €</div>
                </div>
                <!-- add button -->
                <div>
                    <button type="button" @click="addDishOnCart(dish)"
                        class="ms-button-border text-center px-2 text-center ms-primary h-100 d-flex justify-content-center align-items-center">+</button>
                </div>
            </div>
            <div class="d-flex justify-content-between p-2 mt-2">
                <div>Totale dell'ordine</div>
                <div class="fw-bold">{{ store.totalPrice.toFixed(2).replace(".", ',') }} €</div>
            </div>
        </div>
        <router-link :to="{ name: 'checkout' }">
            <div class="d-flex justify-content-center p-3 pb-0">
                <div class="ms-btn-custom" role="button">Vai al pagamento</div>
            </div>
        </router-link>

    </div>
    <div v-else>
        <div class="ms-cart border rounded-1 p-3 vstack justify-content-around align-items-center text-secondary">
            <div class="h3"><i class="fa-solid fa-cart-shopping"></i></div>
            <div>Il carrello è vuoto</div>
            <div>Aggiungi un piatto al carrello!</div>
            <div class="d-flex justify-content-center p-3 pb-0">
                <button class="btn btn-secondary" type="button" disabled>Vai al pagamento</button>
            </div>
        </div>
    </div>
    <div class="ms-mini-cart border rounded-1 p-2 mt-2" v-if="store.storedProducts.length > 0">
        <div class="fw-bold my-auto">{{ store.totalPrice.toFixed(2).replace(".", ',') }} €</div>
        <router-link :to="{ name: 'checkout' }">
            <div>
                <div class="ms-btn-custom" role="button">Vai al pagamento</div>
            </div>
        </router-link>

    </div>
    <!-- Modal -->
    <div class="modal fade" id="confirmClearCart" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="confirmDeleteModalLabel">Conferma eliminazione</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Sei sicuro di voler annullare il tuo ordine?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="clearCart">Svuota il
                        carrello</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../style/generic';
@use '../style/partials/variables' as *;

.ms-primary {
    color: $primary-color;
}

.ms-btn-custom {
    background-color: $primary-color;
    font-family: $secondary-font;
    color: #fff;
    text-decoration: none;
    padding: 8px 8px 4px;
    border-radius: 8px;
    box-shadow: inset 0 1px 0 #ffffff26, 0 1px 1px #00000013;
    transition: transform 0.5s ease;

    &:hover {
        // background-color: $primary-color;
        // color: #fff;
        transform: scale(1.1);
    }
}

.ms-cart {
    min-height: 300px;
}

.ms-inside-cart {
    max-height: 356px;
    overflow-y: scroll;
}

.ms-mini-cart {
    display: none;
}

.ms-button-border {
    border: none;
    background-color: #fff;
}

@media screen and (max-width: 768px) {
    .ms-cart {
        display: none;
    }

    .ms-mini-cart {
        width: 100%;
        background-color: $primary-color;
        display: flex;
        justify-content: space-around;
        color: $bg-color-gray;

        .ms-btn-custom {
            background-color: $bg-color-gray;
            font-family: $secondary-font;
            color: $primary-color;
            text-decoration: none;
            padding: 8px 8px 4px;
            border-radius: 8px;
            box-shadow: inset 0 1px 0 #ffffff26, 0 1px 1px #00000013;
            transition: transform 0.5s ease;

            &:hover {
                // background-color: $primary-color;
                // color: #fff;
                transform: scale(1.1);
            }
        }
    }

}
</style>