<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'AppPayments',
    data() {
        return {
            store,
            orderPlaced: false, // stato per controllare se l'ordine è stato piazzato
            orderData: null, // dati dell'ordine
            menuLinks: [
                {
                    label: 'Home',
                    routeName: 'home'
                },
            ]
        };
    },
    methods: {
        getValidation() {
            const button = document.querySelector('#submit-button');

            braintree.dropin.create({
                authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
                selector: '#dropin-container'
            }, (err, instance) => {


                button.addEventListener('click', () => {
                    instance.requestPaymentMethod((err, payload) => {
                        if (err) {
                            console.error(err);
                            return;
                        }

                        // Invia payload.nonce e i dati dell'ordine al server
                        this.orderData = {
                            cart: this.store.cart,
                            totalPrice: this.store.totalPrice,
                            paymentNonce: payload.nonce
                        };

                        // Imposta lo stato per mostrare i dettagli dell'ordine
                        console.log(this.orderData);
                        axios.post(`${store.apiBaseUrl}/api/orders`, store.orderData)
                            .then((response) => {
                                this.success = response.data.success;
                                if (this.success) {
                                    this.orderPlaced = true;
                                    console.log(store.orderData);
                                    // this.isValid = true;
                                    // this.$router.push({ name: 'order-confirm' });
                                    store.currentRestaurant = null;
                                    store.cart = [];
                                    store.totalPrice = 0;
                                    localStorage.clear();
                                } else {
                                    this.errors = response.data.errors;
                                }
                            })
                    });
                });
            });
        }
    },
    mounted() {
        this.getValidation();
    }
}
</script>

<template>
    <div class="container">
        <template v-if="!orderPlaced">
            <h4>Inserisci i dati della carta per effettuare il pagamento</h4>
            <div class="row">
                <div class="col-md-8">
                    <div id="dropin-container"></div>
                    <button id="submit-button" class="button button--small button--green">Effettua il pagamento</button>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="container">
                <div class="row">
                    <h3 class="text-center text-success">Ordine effettuato con successo!</h3>
                    <div class="border rounded p-3">
                        <div class="h3 border-bottom pb-1">Riepilogo dell'ordine</div>
                        <div class="h5 mt-3">I tuoi dati:</div>
                        <div><span class="fw-bold">Indirizzo:</span> {{ store.orderData.address }}</div>
                        <div><span class="fw-bold">Telefono:</span> {{ store.orderData.phone_number }}</div>
                        <div><span class="fw-bold">Email:</span> {{ store.orderData.email }}</div>

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

h1,
p {
    text-align: center;
}

ul {
    list-style: none;
    padding: 0;
}
</style>
