<script>
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
                if (err) {
                    console.error(err);
                    return;
                }

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
                        this.orderPlaced = true;
                        console.log(this.orderData);
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
            <div class="card p-4">
                <h1>Conferma dell'Ordine</h1>
                <div>
                    <h2>Dettagli dell'Ordine</h2>
                    <ul>
                        <li v-for="(dish, index) in orderData.cart" :key="index">
                            {{ dish.quantity }}x {{ dish.name }} - {{ dish.price.replace("." , ",") }} €
                        </li>
                    </ul>
                </div>

                <p><strong>Totale: {{ orderData.totalPrice.toFixed(2).replace("." , ",") }} €</strong></p>
                <div v-for="link in menuLinks">
                    <router-link class="nav-link" activeClass="ms-active" aria-current="page"
                        :to="{ name: link.routeName }">Torna alla Home</router-link>
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
