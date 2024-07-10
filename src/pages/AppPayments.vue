<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'AppHome',
    data() {
        return {
            store,
            success: null,
            errors: {},
            isValid: false
        }
    }, methods: {
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
                    axios.post(`${store.apiBaseUrl}/api/orders`, store.orderData)
                        .then((response) => {
                            this.success = response.data.success;
                            if (this.success) {
                                console.log(store.orderData);
                                this.isValid = true;
                                // this.$router.push({ name: 'order-confirm' });
                                store.currentRestaurant = null;
                                store.cart = [];
                                store.totalPrice = 0;
                                localStorage.clear();
                            } else {
                                this.errors = response.data.errors;
                            }
                        })
                })
            });
            this.goToConfirm();
        },
        goToConfirm() {
            if (this.isValid) {
                this.$router.push({ name: 'order-confirm' });
            }
        },
    },
    mounted() {
        this.getValidation()
    }
}
</script>


<template>
    <div v-if="errors">
        <div v-for="error in errors">
            {{ error }}
        </div>
    </div>

    <div class="container">
        <h4>Inserisci i dati della carta per effettuare il pagamento</h4>
        <div class="row">
            <div class="col-md-8">
                <div id="dropin-container"></div>
                <button id="submit-button" class="button button--small button--green">Effettua il
                    pagamento</button>
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
    appearance: none;
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