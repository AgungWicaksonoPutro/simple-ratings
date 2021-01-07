import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import VueSweetalert2 from 'vue-sweetalert2'
import { IconsPlugin } from 'bootstrap-vue'

Vue.use(VueSweetalert2)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
