import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { Input, Message } from "element-ui"

Vue.config.productionTip = false

// element-ui组建引用
Vue.use(Input)
Vue.prototype.$message = Message
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
