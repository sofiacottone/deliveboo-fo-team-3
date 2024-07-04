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
                    routeName: 'about'
                },
                {
                    label: 'Ristoranti',
                    routeName: 'restaurants'
                },
                {
                    label: 'Carrello',
                    routeName: 'checkout'
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
                    <img src="../assets/img/logo-deliveboo-fo.png" alt="Logo" width="100%" height="34"
                        class="d-inline-block align-text-top">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse align-items-baseline justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item" v-for="link in menuLinks">
                            <router-link class="nav-link" activeClass="ms-active" aria-current="page"
                                :to="{ name: link.routeName }">{{ link.label }}</router-link>
                        </li>

                    </ul>
                    <span class="ps-3">
                        <a href="http://127.0.0.1:8000/" target="_blank"><button class="ms-btn-custom">Sei un
                                ristoratore?</button></a>
                    </span>

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

.nav-item>.nav-link {
    font-family: $secondary-font;
    font-weight: 500;
    font-size: 16px;
    text-transform: uppercase;

    &.ms-active {
        color: $primary-color !important;
    }
}

.ms-btn-custom {
    background-color: #fff;
    font-family: $secondary-font;
    color: $primary-color;
    text-decoration: none;
    padding: 8px 8px 4px;
    border-radius: 8px;
    box-shadow: inset 0 1px 0 #ffffff26, 0 1px 1px #00000013;
    border: 2px solid $primary-color;
    transition: transform 0.5s ease;

    &:hover {
        background-color: $primary-color;
        color: #fff;
        transform: scale(1.1);
    }
}
</style>