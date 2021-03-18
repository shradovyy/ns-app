import Vue from 'nativescript-vue'
import App from './components/App'
import RadListView from 'nativescript-ui-listview/vue'
import Vuex from 'vuex'

Vue.use(Vuex);
Vue.use(RadListView);
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


const storage = new Vuex.Store({
  state: {
    lastSwipeAt: null
  },
  mutations: {
    setComponent: (state, el) => {
      state.lastSwipeAt = el;
    }
  },
  getters: {

  }
});


Vue.directive('action', {
  bind: function (el, binding, vnode) {

        

        el.nativeView.addEventListener('tap', (args) => {
          storage.commit('setComponent', args.object);
         
        }, this);

  },
  unbind: function (el) {
    
    
  },
});


new Vue({
  render: h => h('frame', [h(App)]),
  store: storage
}).$start()
