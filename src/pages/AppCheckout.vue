<script>
import { store } from '../store.js';
import ShoppingCart from '../components/ShoppingCart.vue';

export default {
    name: 'AppCheckout',
    components: {
        ShoppingCart
    },
    data() {
        return {
            store,
            isValid: false,
            userFullName: '',
            userEmail: '',
            userAddress: '',
            userPhone: '',
            success: null,
        }
    },
    methods: {
        handleSubmit(event) {
            // Perform form validation here
            if (this.validateForm()) {
                this.isValid = true;
                this.goToPayments();
            } else {
                this.isValid = false;
                // Show error messages
            }
        },
        validateForm() {
            // Validate form fields here
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;

            if (fullname && email && address && phone) {
                return true;
            } else {
                return false;
            }
        },
        goToPayments() {
            if (this.isValid) {
                this.$router.push({ name: 'payments' });
            }
        },
        sendForm() {
            store.orderData = {
                full_name: this.userFullName,
                address: this.userAddress,
                phone_number: this.userPhone,
                email: this.userEmail,
                price: store.totalPrice,
                dishes: store.cart
            }
        },
        hasHistory() {
            return window.history.length > 2
        },
    },
    mounted() {
        // this.sendForm();
    }
}
</script>

<template>
    <div class="container mt-4">
        <div class="pb-3 ms-primary" @click="hasHistory() ? $router.go(-1) : $router.push('/')" role="button">
            <i class="fa-solid fa-arrow-left"></i>
            Indietro
        </div>
        <h3>Inserisci i tuoi dati per procedere con il pagamento</h3>
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <div class="card-body">
                            <form @submit.prevent="handleSubmit(); sendForm()">
                                <div class="mb-4 row">
                                    <label for="fullname" class="col-md-4 col-form-label text-md-right">Nome e
                                        Cognome<span style="color: red;">*</span>
                                    </label>

                                    <div class="col-md-6">
                                        <input type="text" v-model="userFullName" class="form-control" id="fullname"
                                            pattern=".{5,250}" title="Il nome deve contenere almeno 5 lettere" required>
                                    </div>
                                </div>
                                <div class="mb-4 row">
                                    <label for="email" class="col-md-4 col-form-label text-md-right">Email<span
                                            style="color: red;">*</span>
                                    </label>

                                    <div class="col-md-6">
                                        <input type="email" v-model="userEmail" class="form-control" id="email"
                                            required>
                                    </div>
                                </div>
                                <div class="mb-4 row">
                                    <label for="address" class="col-md-4 col-form-label text-md-right">Indirizzo<span
                                            style="color: red;">*</span>
                                    </label>

                                    <div class="col-md-6">
                                        <input type="text" v-model="userAddress" class="form-control" id="address"
                                            required>
                                    </div>
                                </div>
                                <div class="mb-4 row">
                                    <label for="phone" class="col-md-4 col-form-label text-md-right">Numero di
                                        telefono<span style="color: red;">*</span>
                                    </label>

                                    <div class="col-md-6">
                                        <input type="tel" v-model="userPhone" class="form-control" id="phone" required
                                            pattern="[0-9]{10,13}"
                                            title="Il numero deve contenere 10 o 12 cifre(con prefisso)">
                                    </div>
                                </div>

                                <div class="d-flex justify-content-center p-3 pb-0">
                                    <button type="submit" class="btn btn-primary">Vai al pagamento</button>
                                </div>



                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-25 border rounded-1 p-3 ms-cart" v-if="store.cart.length > 0">
                <ShoppingCart></ShoppingCart>
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
</style>
