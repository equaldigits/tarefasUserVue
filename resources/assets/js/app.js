require('./bootstrap');

window.Vue = require('vue');

Vue.component('example', require('./components/ExampleComponent.vue'));
Vue.component('task', require('./components/Task.vue'));

const app = new Vue({
    el: '#app'
});
