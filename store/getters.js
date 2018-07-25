const getters = {
  isLogged: state => {
    return state.isLogged
  },
  modalFormName: state => {
    return state.modalForm
  },
  authToken: state => {
    return state.user.token
  },
  userProperties: state => {
    return state.user.properties
  },
  noteState: state => {
    return state.notes.changed
  },
  noteId: state => {
    return state.notes.id
  },
  getNoteTitle: state => {
    return state.notes.body.title
  },
  getNoteBody: state => {
    return state.notes.body.body
  },
}

export default getters
