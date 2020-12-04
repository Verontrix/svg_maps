import Vue from 'vue'
import App from './App.vue'
import router from './router'
import svgJs from "./plugin/vueSvgPlugin"
import Notifications from 'vue-notification'
import domparse from 'domparser'
import vuetify from './plugins/vuetify';

Vue.use(svgJs);
Vue.use(Notifications);
Vue.use(domparse);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
