const mutations = {
  LOGIN: function (state, payload) {
    state.user = {
      ...state.user,
      name: payload.username,
      token: payload.token,
    }
    state.isLogged = true
  },
  LOGOUT: function (state) {
    state.user = {
      ...state.user,
      name: null,
      token: null,
      properties:null
    }
    state.isLogged = false
  },
  RESET: function (state) {
    console.log(state.modalForm)
  },
  SET_USER: function (state, payload) {
    state.user = {
      ...state.user,
      properties: payload.user,
    }
  },

  SET_FORM: function (state, form) {
    state.modalForm = form
  },

  CHANGE_NOTES: function (state,payload) {
    state.note = payload.status
    state.notes = {
      ...state.notes,
      changed : payload.status,
      id : payload.id,
      body : ( payload.body ) ? payload.body : ''
    }
  },
}

export default mutations
