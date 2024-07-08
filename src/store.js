import { reactive } from 'vue'

export const store = reactive({
    apiBaseUrl: 'http://127.0.0.1:8000',
    restaurantsByCategories: [],
    selectedCategories: '',
    newPrice: 0,
    newPriceArray: [],
    totalPrice: 0,
    cart: [],
    storedProducts: [],
    storedPrice: null

});