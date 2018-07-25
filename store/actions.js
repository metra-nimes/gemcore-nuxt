const actions = {

  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.token && req.session.username ) {
      commit('LOGIN', req.session )
    }
  },
  async login({commit}, {username, password}) {
    try {
      const res = await this.$axios.$get('/auth', {
        params: {username , password}
      })
      let token = res.token

      const sessionPromise = this.$axios.$post(process.env.DEV_API+'/api/login',{username,token})

      const [session] = await Promise.all([sessionPromise])
      commit('LOGIN', {username,token})
      console.log(session)
    } catch (error) {
      throw error
    }
  },
  async register({commit},form) {
    let {username} = JSON.parse(form)
    try {
      const res = await this.$axios.$post('/user',form, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      let token = res.token
      const sessionPromise = this.$axios.$post(process.env.DEV_API+'/api/login',{username,token})
      const [session] = await Promise.all([sessionPromise])
      commit('LOGIN', {username,token})
      console.log(session)
    } catch (error) {
      throw error
    }
  },
  async reset({commit},{username,type,token}) {
    console.log({username,type,token})
    try {
      const res = await this.$axios.$post('/user/resetPassword',{username,type,token})
      console.log(res)
      commit('RESET')
    } catch (error) {
      throw error
    }
  },
  async logout({commit}) {
    try {
      await this.$axios.$get(process.env.DEV_API+'/api/logout').then((res) => {
        commit('LOGOUT')
        console.log(res)
      })
    } catch (error) {
      throw error
    }
  },
  async modal_form({commit},{formName}) {
    commit('SET_FORM', formName)
  },
  async user({commit},token) {
    try {
      const user = await this.$axios.$get('/user', {
        params: { token: token }
      })
      commit('SET_USER', {user})
    } catch (error) {
      throw error
    }
  },
  async addNote({ commit },{ body, token, title}) {
    try {
      await this.$axios.$post('/user/note',{ body, token, title })
      commit('CHANGE_NOTES',{ id : null, status : true })
    } catch (error) {
      throw error
    }
  },
  async deleteNote({commit},{id,token}) {
    try {
      await this.$axios.$delete('/user/note',{data:{id,token}})
      commit('CHANGE_NOTES',{ id : id, status : true })
    } catch (error) {
      error
    }
  },
  async editNote({commit},{ id, token, title, body}) {
    try {
      await this.$axios.$put('/user/note',{ id, token, title, body })
      commit('CHANGE_NOTES',{ id : id, status : true })
    } catch (error) {
      error
    }
  },
}

export default actions
