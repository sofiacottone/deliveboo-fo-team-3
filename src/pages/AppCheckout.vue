<script>
import { store } from '../store.js';

export default {
    name: 'AppCheckout',
    data() {
        return {
            store
        }
    },
    methods: {
        getValidation() {
            const button = document.querySelector('#submit-button');

            braintree.dropin.create({
                authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
                selector: '#dropin-container'
            }, function (err, instance) {
                button.addEventListener('click', function () {
                    instance.requestPaymentMethod(function (err, payload) {
                        // Submit payload.nonce to your server
                    });
                })
            });
        }
    },
    mounted() {
        this.getValidation()
    }
}
</script>

<template>
    <div class="container">
        <div class="container mt-4">
            <h3>Inserisci i tuoi dati per effettuare il pagamento</h3>
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-body">
                                <form>
                                    <div class="mb-4 row">
                                        <label for="fullname" class="col-md-4 col-form-label text-md-right">Nome e
                                            Cognome<span style="color: red;">*</span>
                                        </label>

                                        <div class="col-md-6">
                                            <input type="text" class="form-control" id="fullname" pattern=".{5,250}"
                                                title="Il nome deve contenere almeno 5 lettere" required>
                                        </div>
                                    </div>
                                    <div class="mb-4 row">
                                        <label for="email" class="col-md-4 col-form-label text-md-right">Email<span
                                                style="color: red;">*</span>
                                        </label>

                                        <div class="col-md-6">
                                            <input type="email" class="form-control" id="email" required>
                                        </div>
                                    </div>
                                    <div class="mb-4 row">
                                        <label for="address"
                                            class="col-md-4 col-form-label text-md-right">Indirizzo<span
                                                style="color: red;">*</span>
                                        </label>

                                        <div class="col-md-6">
                                            <input type="text" class="form-control" id="address" required>
                                        </div>
                                    </div>
                                    <div class="mb-4 row">
                                        <label for="phone" class="col-md-4 col-form-label text-md-right">Numero di
                                            telefono<span style="color: red;">*</span>
                                        </label>

                                        <div class="col-md-6">
                                            <input type="tel" class="form-control" id="phone" required
                                                pattern="[0-9]{10,13}"
                                                title="Il numero deve contenere 10 o 12 cifre(con prefisso)">
                                        </div>
                                    </div>
                                    <hr class="mb-4">


                                    <div id="dropin-container"></div>
                                    <button id="submit-button"
                                        class="button button--small button--green">Purchase</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-25 border rounded-1 p-3 ms-cart" v-if="store.cart.length > 0">
                    <div class="d-flex justify-content-between mb-3">
                        <div class="fw-bold">Il tuo ordine</div>
                    </div>
                    <div class="border rounded-1 p-2">
                        <div class="d-flex justify-content-between border-bottom px-2 py-4"
                            v-for="(dish, index) in store.cart">
                            <div class="d-flex gap-3">
                                <div>{{ dish.quantity }}x</div>
                                <div>{{ dish.name }}</div>
                            </div>
                            <div class="d-flex gap-3">
                                <div v-if="dish.quantity == 1">{{ dish.price }} €</div>
                                <div v-else>{{ store.newPriceArray[dish.id] }} €</div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between p-2 mt-2">
                            <div>Totale dell'ordine</div>
                            <div class="fw-bold">{{ store.totalPrice }} €</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<style lang="scss" scoped>
.button {
    cursor: pointer;
    font-weight: 500;
    left: 3px;
    line-height: inherit;
    position: relative;
    text-decoration: none;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    -webkit-appearance: none;
    -moz-appearance: none;
    display: inline-block;
}

.button--small {
    padding: 10px 20px;
    font-size: 0.875rem;
}

.button--green {
    outline: none;
    background-color: #64d18a;
    border-color: #64d18a;
    color: white;
    transition: all 200ms ease;
}

.button--green:hover {
    background-color: #8bdda8;
    color: white;
}
</style>