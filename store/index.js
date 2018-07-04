import Vuex from 'vuex'
import MODULE_USER from './modules/usuarios'
const store = () => new Vuex.Store({
    state: {
      albums: []
    },
    mutations: {
      add (state, payload) {
        state.albums = payload;
      }
    },
    modules: {
      MODULE_USER
    }  
})
export default store