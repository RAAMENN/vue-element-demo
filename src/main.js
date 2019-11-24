import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import {
  Input,
  Message,
  Select,
  Option,
  InputNumber,
  Row,
  Col,
  Button,
  Tooltip
} from "element-ui"

Vue.config.productionTip = false

// element-ui组建引用
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(InputNumber)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Tooltip)
Vue.prototype.$message = Message
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
