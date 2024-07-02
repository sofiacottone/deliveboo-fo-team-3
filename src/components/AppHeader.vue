<script>

export default {
    name: 'AppHeader',
    data() {
        return {
            menuLinks: [
                {
                    label: 'Home',
                    routeName: 'home'
                },
                {
                    label: 'Chi siamo',
                    routeName: 'chi-siamo'
                },
                {
                    label: 'Ristoranti',
                    routeName: 'ristoranti'
                },
                {
                    label: 'Carrello',
                    routeName: 'carrello'
                },
                {
                    label: 'Registrati o accedi',
                    routeName: 'registrati'
                }
            ]
        };
    }
}

</script>

<template>

    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="../assets/img/logo-deliveboo-fo.png" alt="Logo" width="100%" height="34" class="d-inline-block align-text-top">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item" v-for="link in menuLinks">
                            <a class="nav-link active" aria-current="page" href="#">{{ link.label }}</a>
                        </li>
                        <button class="btn btn-primary">Registrati o accedi</button>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

</template>

<style lang="scss" scoped>

    @use '../style/generic';
    @use '../style/partials/variables' as *;

    .navbar {
        background-color: transparent !important;

    }

    .nav-item > .nav-link {
        font-family: $primary-font;
        font-size: 16px;
        text-transform: uppercase;
        color: $main-text-color !important;
    }

</style>