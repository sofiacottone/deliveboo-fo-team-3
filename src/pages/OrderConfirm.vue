<script>
import { store } from '../store.js';
export default {
    name: 'OrderConfirm',
    data() {
        return {
            store
        }
    }, methods: {

    },
    mounted() {
        this.getValidation()
    }
}
</script>


<template>
    <div class="container">
        <div class="row">
            <h3 class="text-center text-success">Ordine effettuato con successo!</h3>
            <div class="border rounded p-3">
                <div class="h3 border-bottom pb-1">Riepilogo dell'ordine</div>
                <div class="h5 mt-3">I tuoi dati:</div>
                <div><span class="fw-bold">Indirizzo:</span> {{ store.orderData.address }}</div>
                <div><span class="fw-bold">Telefono:</span>{{ store.orderData.phone_number }}</div>
                <div><span class="fw-bold">Email:</span>{{ store.orderData.email }}</div>

                <div class="h5 mt-3">I piatti che hai ordinato</div>
                <div v-for="dish in store.orderData.dishes" class="d-flex gap-3">
                    <div>{{ dish.quantity }}x</div>
                    <div>{{ dish.name }}</div>
                    <div>{{ dish.price }} €</div>
                </div>

                <div class="mt-3"><span class="h5">Totale:</span> {{ store.orderData.price }} €</div>
                <div></div>
            </div>
            <h3 class="text-center mt-4">Riceverai il tuo ordine il prima possibile!</h3>

        </div>
    </div>

</template>

<style lang="scss" scoped></style>