<template>
  <b-card :id="note._id" :title="note.title" class="mb-3">
    <p class="card-text">
      {{ note.body }}
    </p>
    <div class="d-flex justify-content-end">
      <b-button id="EditNote" variant="success" @click="editNote($event)"><i class="fa fa-pencil" aria-hidden="true"/></b-button>
      <b-button variant="danger" @click="deleteNote($event)"><i class="fa fa-trash" aria-hidden="true"/></b-button>
    </div>
  </b-card>
</template>

<script>
  export default {
    name: "Note",
    props: {
      note: {
        type: [Object],
        default: function () {
          return {}
        }
      },
    },
    computed: {
      authToken() {
        return this.$store.getters.authToken
      },
    },
    methods: {
      async deleteNote(e) {
        let el = e.target.closest('.card')
        try {
          await this.$store.dispatch('deleteNote',{
            id: el.id,
            token: this.authToken
          }).then(() => {
            this.$toast.success('Note deleted',{duration:2000,position:'bottom-right'})
          })
        } catch (e) {
          this.$toast.error(e,{duration:2000,position:'bottom-right'})
        }
      },
      async editNote(e) {
        let el = e.target.closest('.card')
        let elBody = e.target.closest('.card-body')
        let elBodyChildren = elBody.querySelectorAll('.card-title,.card-text')
        // Parse note title && body
        let body =  {
          body : elBodyChildren[1].textContent.trim(),
          title :  elBodyChildren[0].textContent.trim()
        }
        // Store note body to stat
        this.$store.commit('CHANGE_NOTES',{ id : el.id, status : false ,body : body})
        // Store form name EditNote for dynamic modal
        this.$store.dispatch('modal_form', {formName: e.currentTarget.id})
        // Show modal
        this.$root.$emit('bv::show::modal','modal')

      }
    }
  }
</script>

<style scoped>

</style>
