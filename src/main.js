import Vue from 'vue'
import App from './App.vue'
import router from './router'
import svgJs from "./plugin/vueSvgPlugin"
import Notifications from 'vue-notification'
import domparse from 'domparser'

Vue.use(svgJs);
Vue.use(Notifications);
Vue.use(domparse);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
