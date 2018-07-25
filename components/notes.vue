<template>
  <div>
    <div class="d-flex justify-content-between">
      <b-button id="AddNote" class="font-weight-bold" variant="info" @click="showModal($event)">
        <i class="fa fa-plus" aria-hidden="true"/>
      </b-button>
    </div>

    <div class="m-4 col-9">
      <div v-for="note in notes" :key="note._id">
        <Note :note="note"/>
      </div>
      <div v-if="error !== null" class="d-flex justify-content-center align-items-center flex-column m-2">
        <p class="text-danger text-center text-uppercase text-muted"> {{ error }}</p>
      </div>
      <div v-else-if="!notes.length" class="d-flex justify-content-center align-items-center flex-column m-2">
        <p class="text-uppercase text-muted text-center">No Notes found</p>
      </div>
    </div>
  </div>
</template>

<script>

  import Note from './note'

  export default {
    name: "Notes",
    components: {
      Note
    },
    data () {
      return {
        notes: '' ,
        error: null,
      }
    },
    computed: {
      authToken() {
        return this.$store.getters.authToken
      },
      noteState() {
        return this.$store.getters.noteState
      },
    },
    watch:{
      noteState() {
        this.getNotes()
      }
    },
    created() {
      this.getNotes()
    },
    updated() {
      // Clean notes state after re-render notes page
      this.$store.commit('CHANGE_NOTES',{ id : null, status : false ,body: {}})
    },
    methods: {
      // Fill notes page
      async getNotes() {
          try {
            const notes = await this.$axios.$get('/user/note/', {
              params: { token: this.authToken }
            })
            this.notes = notes
          } catch (err) {
            this.error = err
            throw err
          }
      },
      showModal (e) {
        // Store form name AddNote for dynamic modal
        this.$store.dispatch('modal_form', {formName: e.currentTarget.id})
        //Show modal
        this.$root.$emit('bv::show::modal','modal')
      },
    }
  }
</script>

<style scoped>

</style>
