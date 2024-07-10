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
            store
        }
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


                                    <div class="row">
                                        <div class="col-sm-6 mb-3">
                                            <label for="cc-name">Nome del proprietario della carta</label>
                                            <input type="text" class="form-control" id="cc-name" required>

                                            <small class="text-muted">Devi inserire il nome visualizzato sulla
                                                carta</small>

                                        </div>
                                        <div class="col-sm-6 mb-3">
                                            <label for="cc-number">Numero della carta di credito</label>
                                            <input type="tel" class="form-control" id="cc-number" required
                                                pattern="[0-9]{16}" title="Il numero inserito deve contenere 16 cifre">
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-3 mb-3">
                                            <label for="cc-expiration">Expiration</label>
                                            <input type="month" class="form-control" id="cc-expiration" required>
                                        </div>
                                        <div class="col-sm-3 mb-3">
                                            <label for="ccv">CVV</label>
                                            <input type="tel" class="form-control" id="ccv" required pattern="[0-9]{3}"
                                                title="Il numero inserito deve contenere 3 cifre">
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button class="btn btn-primary btn-lg" type="submit"> <span id="card-brand">Paga
                                                con la tua carta</span></button>
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
    </div>
</template>

<style lang="scss" scoped></style>