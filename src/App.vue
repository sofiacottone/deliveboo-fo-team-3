<script>

import AppHeader from './components/AppHeader.vue';

export default {
    components: {
        AppHeader,
    },
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<template>
    <AppHeader></AppHeader>
    <main>
        <router-view></router-view>
    </main>
</template>

<style lang="scss">
@use './style/generic';
@use './style/partials/variables' as *;
</style>
