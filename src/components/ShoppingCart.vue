<script>
import { store } from '../store.js';

export default {
    name: 'ShoppingCart',
    props: {

    },

    data() {
        return {
            store
        }
    },
    methods: {
        getImageUrl(name) {
            return new URL(`../assets/img/${name}`, import.meta.url).href;
        },
    }
}

</script>

<template>

    <div class="border rounded-1 p-3">
        <div class="d-flex justify-content-between mb-3">
            <div class="fw-bold">Il tuo ordine</div>
            <div class="ms-primary" role="button"><i class="fa-solid fa-trash p-1"></i></div>
        </div>
        <div class="fw-bold pb-2">Carrello</div>
        <div class="border rounded-1 p-2">
            <div class="d-flex justify-content-between border-bottom px-2 py-4">
                <div class="d-flex gap-3">
                    <div>Quantità</div>
                    <div>Prodotto</div>
                </div>
                <div class="d-flex gap-3">
                    <div>Prezzo</div>
                    <i class="fa-solid fa-chevron-right ms-primary" role="button"></i>
                </div>
            </div>
            <div class="d-flex justify-content-between p-2 mt-2">
                <div>Totale dell'ordine</div>
                <div class="fw-bold">Prezzo</div>
            </div>

        </div>
        <div class="d-flex justify-content-center p-3 pb-0">
            <div class="ms-btn-custom" role="button">Vai al pagamento</div>
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
</style>