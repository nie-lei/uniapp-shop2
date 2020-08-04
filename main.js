import Vue from 'vue'
import App from './App'
import {myRequest} from './util/api.js'
import * as myuniapi from './util/asyncUni.js'

Vue.prototype.$myRequest = myRequest
Vue.prototype.$myUniApi= myuniapi

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
