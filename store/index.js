//import mutations from './mutations'

export const state = () => ({
  isAuth: false,
  authToken:null
})

export const mutations = {
  SET_AUTH: function (state, token) {
    state.authToken = token
    state.isAuth = true
  }
}

export const actions = {

/*  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },*/
  async login({ commit },{username , password}) {
    try {
      const response = await this.$axios.$get(process.env.DEV_API+'/auth', {
        params: {username , password}
      })
      commit('SET_AUTH',response.token)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('refusal of authorization')
      }
      else if (error.response && error.response.status === 404) {
        throw new Error('user is not found')
      }
      throw error
    }
  },

  async logout({ commit }) {
    await axios.post('/api/logout')
    commit('SET_AUTH', null)
  }

}
