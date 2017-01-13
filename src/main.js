import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api'
new Vue({
  router,
  api,
  render: h => h(App)
}).$mount('#app')
