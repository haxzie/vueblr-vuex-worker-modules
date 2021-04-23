import Vue from 'vue'
import App from './App.vue'
import store from './store'

import "./styles/global.scss"

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
