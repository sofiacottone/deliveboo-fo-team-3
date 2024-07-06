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
        
}
    }
    
}

</script>

<template>

    <div class="mx-auto my-3 w-25 border rounded-1 p-3" v-if="store.cart.length > 0">
        <div class="d-flex justify-content-between mb-3">
            <div class="fw-bold">Il tuo ordine</div>
            <div class="ms-primary" role="button" @click="clearCart"><i class="fa-solid fa-trash p-1"></i></div>
        </div>
        <div class="fw-bold pb-2">Carrello</div>
        <div class="border rounded-1 p-2">
            <div class="d-flex justify-content-between border-bottom px-2 py-4" v-for="(dish, index) in store.cart">
                <div class="d-flex gap-3">
                    <div>Quantità {{ dish.quantity }}</div>
                    <div>Prodotto {{ dish.name }}</div>
                </div>
                <div class="d-flex gap-3">
                    <div v-if="dish.quantity == 1">Prezzo {{ dish.price }} €</div>
                    <div v-else>Prezzo {{ store.newPriceArray[dish.id] }} €</div>
                    <i class="fa-solid fa-chevron-right ms-primary" role="button"></i>
                </div>
            </div>
            <div class="d-flex justify-content-between p-2 mt-2">
                <div>Totale dell'ordine</div>
                <div class="fw-bold">Prezzo  {{ store.totalPrice }}</div>
            </div>
        </div>
        <router-link :to="{ name: 'checkout' }">
            <div class="d-flex justify-content-center p-3 pb-0">
                <div class="ms-btn-custom" role="button">Vai al pagamento</div>
            </div>
        </router-link>
        
    </div>
    <div v-else>
        <div class="d-flex justify-content-between mb-3">
            <div class="fw-bold">Il tuo ordine</div>
            <div class="ms-primary" role="button"><i class="fa-solid fa-trash p-1"></i></div>
        </div>
        <p>Oh oh, il carrello è vuoto!</p>
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
</style>