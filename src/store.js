import { reactive } from 'vue'

export const store = reactive({
    apiBaseUrl: 'http://127.0.0.1:8000',
    newPrice: 0,
    newPriceArray: [],
    totalPrice: 0,
    cart: [],
    currentRestaurant: null,
    orderData: {}

});

const products = JSON.parse(localStorage.getItem('products'));
products ? store.cart = products : store.cart = [];

const tot = parseInt(localStorage.getItem('total price'));
tot ? store.totalPrice = tot : store.totalPrice = 0;

const singlePrice = parseInt(localStorage.getItem('single price'));
singlePrice ? store.newPriceArray = singlePrice : store.newPriceArray = [];

store.currentRestaurant = JSON.parse(localStorage.getItem('restaurant ID'));

store.cart.forEach(dish => {
    store.newPriceArray[dish.id] = dish.price * dish.quantity;
    console.log(store.newPriceArray)
});
//localStorage.clear()
