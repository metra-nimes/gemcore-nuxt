<template>
  <b-form @submit.prevent="onSubmit">
    <div class="text-capitalize text-center">
      <p v-if="responseErr !== null" class="text-danger"> {{ responseErr }}</p>
      <p v-else-if="sending">Add...<i class="fa fa-spinner fa-spin fa-fw"/></p>
    </div>
    <b-row>
      <b-col md="12" sm="12">
        <b-form-group label="Title:"
                      label-for="titleInput">
          <b-form-input id="titleInput"
                        v-model="form.title"
                        class="form-control"
                        type="text"
                        name="title"
                        placeholder=""/>
        </b-form-group>
      </b-col>
      <b-col md="12" sm="12">
        <b-form-group>
          <b-form-textarea v-validate="'required'"
                           id="bodyInput"
                           v-model="form.body"
                           :class="{'form-control': true, 'error': errors.has('username') }"
                           :rows="5"
                           :max-rows="8"
                           type="text"
                           name="body"
                           placeholder="Enter note"/>
          <span v-show="errors.has('body')" class="has-feedback">{{ errors.first("body") }}</span>
        </b-form-group>
      </b-col>
    </b-row>
    <div class="dropdown-divider"/>
    <div class="modal-footer">
      <b-button type="submit" variant="primary">
        Save
      </b-button>
      <b-button variant="danger" @click="hideModal">Close</b-button>
    </div>
  </b-form>
</template>

<script>
  export default {
    name: "AddNote",
    data() {
      return {
        form: {
          body: '',
          title: '',
        },
        sending: false,
        responseErr:null,
      }
    },
    methods: {
      onSubmit() {
        this.$validator.validateAll().then(success => {
          if (success) {
            this.onSend()
          }
        }).catch(e => {
          console.log(e)
        })
      },
      async onSend() {
        this.sending = true
        try {
          await this.$store.dispatch('addNote',  {
            body: this.form.body,
            token: this.$store.getters.authToken,
            title: this.form.title
          }).then(() => {
            this.sending = false
            this.$root.$emit('bv::hide::modal','modal')
            this.clean()
          })
        } catch (e) {
          this.sending = false
          this.responseErr = e.message
        }
      },
      hideModal () {
        this.$root.$emit('bv::hide::modal','modal')
      },
      async clean () {
        const clear = async () => {
          this.form.body = ''
          this.form.title = ''
          this.responseErr = null
        }
        await clear().then(() => {
          this.$validator.reset()
        })
      }
    }
  }
</script>

<style scoped>

</style>
