<script>
export default {
    name: 'AppCheckout'
}
</script>

<template>
    <div class="container">
        <div class="container mt-4">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <h1>Ciao sono Checkout</h1>
                    <div class="card">
                        <div class="card-header">
                            <div class="card-body">
                                <div class="mb-4 row">
                                    <label for="fullname"
                                        class="col-md-4 col-form-label text-md-right">Nome e Cognome<span style="color: red;">*</span>
                                    </label>
                                            
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" id="fullname">
                                    </div>
                        </div>
                    <div class="mb-4 row">
                        <label for="email"
                            class="col-md-4 col-form-label text-md-right">Email<span style="color: red;">*</span>
                        </label>
                                
                        <div class="col-md-6">
                            <input type="email" class="form-control" id="email">
                        </div>
                    </div>
                    <div class="mb-4 row">
                        <label for="address"
                            class="col-md-4 col-form-label text-md-right">Indirizzo<span style="color: red;">*</span>
                        </label>
                                
                        <div class="col-md-6">
                            <input type="text" class="form-control" id="address">
                        </div>
                    </div>
                    <div class="mb-4 row">
                        <label for="phone"
                            class="col-md-4 col-form-label text-md-right">Numero di telefono<span style="color: red;">*</span>
                        </label>
                                
                        <div class="col-md-6">
                            <input type="tel" class="form-control" id="phone">
                        </div>
                    </div>
                    <hr class="mb-4">
                    <form class="needs-validation" novalidate="">

<div class="row">
<div class="col-sm-6 mb-3">
    <label for="cc-name">Nome del proprietario della carta</label>
    <input type="text" class="form-control" id="text">

    <small class="text-muted">Devi inserire il nome visualizzato sulla carta</small>
    <div class="invalid-feedback">
    Name on card is required
    </div>
</div>
<div class="col-sm-6 mb-3">
    <label for="cc-number">Numero della carta di credito</label>
    <input type="tel" class="form-control" id="cc-number">
    <div class="invalid-feedback">
    Credit card number is required
    </div>
</div>
</div>

<div class="row">
<div class="col-sm-3 mb-3">
    <label for="cc-expiration">Expiration</label>
    <input type="tel" class="form-control" id="cc-number">
    <div class="invalid-feedback">
    Expiration date required
    </div>
</div>
<div class="col-sm-3 mb-3">
    <label for="cc-expiration">CVV</label>
    <input type="tel" class="form-control" id="cc-expiration">
    <div class="invalid-feedback">
    Security code required
    </div>
</div>
</div>
<div class="text-center">
<button class="btn btn-primary btn-lg" type="submit"> <span id="card-brand">Paga con la tua carta</span></button>
</div>
</form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>