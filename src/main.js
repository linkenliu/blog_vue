import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'
import fiters from './fiters'

require('./assets/css/style.css')

new Vue({
  router,
  api,
  fiters,
  render: h => h(App)
}).$mount('#app')
