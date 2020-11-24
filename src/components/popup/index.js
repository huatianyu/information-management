const directive = require('./directive')
const Popup = require('./Popup.vue')

Popup.install = Vue => {
  Vue.directive('popup', directive)
  Vue.component(Popup.name, Popup)
}

export default Popup
