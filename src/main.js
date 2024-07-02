import { createApp } from 'vue'
import * as bootstrap from 'bootstrap';
import App from './App.vue'
import { router } from './router'

// createApp(App).mount('#app')
createApp(App).use(router).mount('#app')
