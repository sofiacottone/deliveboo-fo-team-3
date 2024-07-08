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

    <div class="w-25 border rounded-1 p-3 ms-cart" v-if="store.storedProducts.length > 0">
        <div class="d-flex justify-content-between mb-3">
            <div class="fw-bold">Il tuo ordine</div>
            <div data-bs-toggle="modal" data-bs-target="#confirmClearCart">
                <div class="ms-primary" role="button"><i class="fa-solid fa-trash p-1"></i></div>
            </div>
        </div>
        <div class="fw-bold pb-2">Carrello</div>
        <div class="border rounded-1 p-2">
            <div class="d-flex justify-content-between border-bottom px-2 py-4" v-for="(dish, index) in store.cart">
                <div class="d-flex gap-3">
                    <div>{{ dish.quantity }}x</div>
                    <div>{{ dish.name }}</div>
                </div>
                <div class="d-flex gap-3">
                    <div v-if="dish.quantity == 1">{{ dish.price }} €</div>
                    <div v-else>{{ store.newPriceArray[dish.id].toFixed(2) }} €</div>
                </div>
            </div>
            <div class="d-flex justify-content-between p-2 mt-2">
                <div>Totale dell'ordine</div>
                <div class="fw-bold">{{ store.totalPrice.toFixed(2) }} €</div>
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

    <!-- Modal -->
    <div class="modal fade" id="confirmClearCart" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
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
    min-width: 320px;
}
</style>