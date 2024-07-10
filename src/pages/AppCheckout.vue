<script>
import { store } from '../store.js';

export default {
    name: 'AppCheckout',
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
        }
    },
    mounted() {
        // this.sendForm();
    }
}
</script>

<template>
    <div class="container">
        <div class="container mt-4">
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
                                                pattern=".{5,250}" title="Il nome deve contenere almeno 5 lettere"
                                                required>
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
                                        <label for="address"
                                            class="col-md-4 col-form-label text-md-right">Indirizzo<span
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
                                            <input type="tel" v-model="userPhone" class="form-control" id="phone"
                                                required pattern="[0-9]{10,13}"
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
                    <div class="d-flex justify-content-between mb-3">
                        <div class="fw-bold">Il tuo ordine da {{ store.cart[0].restaurant.restaurant_name }}</div>
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
                            <div class="fw-bold">{{ store.totalPrice.toFixed(2) }} €</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<style lang="scss" scoped></style>
