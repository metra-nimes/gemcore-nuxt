import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    isLogged : false,
    modalForm : 'Register',
    user:{
      name : null,
      token : null,
      properties : null
    },
    note : false,
    notes : {
      changed : false,
      id : null,
      body: {}
    }
  },
  mutations : mutations,
  actions : actions,
  getters : getters
})

export default store
