import Vue from 'vue'
import App from './App.vue'
import services from './services/_index.js'

Vue.config.productionTip = false

//Global Login Methods
Vue.use({
    install(Vue) {
	Object.defineProperty(Vue.prototype, '$services', {
	    value: services
	});
    }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
