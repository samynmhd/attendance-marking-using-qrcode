import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import BootstrapVue from 'bootstrap-vue'
import session from 'vue-session'
import Print from 'vue-print-nb'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

var options = {
  persist: true
}
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(session,options)
Vue.use(Print)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
