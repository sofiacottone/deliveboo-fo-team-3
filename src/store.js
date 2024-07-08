import { reactive } from 'vue'

export const store = reactive({
    apiBaseUrl: 'http://127.0.0.1:8000',
    restaurantsByCategories: [],
    selectedCategories: '',
    newPrice: 0,
    newPriceArray: [],
    totalPrice: 0,
    cart: [],
    currentRestaurant: null
    // storedProducts: [],
    // storedPrice: null,

});

const products = JSON.parse(localStorage.getItem('products'));
products ? store.cart = products : store.cart = [];

const tot = parseInt(localStorage.getItem('total price'));
tot ? store.totalPrice = tot : store.totalPrice = 0;

store.currentRestaurant = JSON.parse(localStorage.getItem('restaurant ID'));
