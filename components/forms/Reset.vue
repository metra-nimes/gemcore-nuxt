<template>
  <b-form @submit.prevent="onSubmit">
    <div class="text-capitalize text-center">
      <p v-if="responseErr !== null" class="text-danger"> {{ responseErr }}</p>
      <p v-else-if="sending">Reset...<i class="fa fa-spinner fa-spin fa-fw"/></p>
      <p v-if="success" class="text-success"> Password Reset !</p>
    </div>
    <b-row>
      <b-col md="12" sm="12">
        <b-form-group label="Username:"
                      label-for="usernameInput">
          <b-form-input v-validate="'required'"
                        id="usernameInput"
                        v-model="form.username"
                        :class="{'form-control': true, 'error': errors.has('username') }"
                        type="text"
                        name="username"
                        placeholder="Enter username"/>
          <span v-show="errors.has('username')" class="has-feedback">{{ errors.first('username') }}</span>
        </b-form-group>
      </b-col>
      <b-col md="12" sm="12">
        <b-form-group label="Password type for reset:"
                      label-for="passwordSelect">
          <b-form-select
            v-validate="'required'"
            id="passwordSelect"
            :class="{'select': true, 'error': errors.has('password type') }"
            v-model="form.selected"
            :options="form.options"
            name="password type"/>
          <span v-show="errors.has('password type')" class="has-feedback">{{ errors.first('password type') }}</span>
        </b-form-group>
      </b-col>
      <b-col md="12" sm="12">
        <b-form-group label="Admin Token:"
                      label-for="tokenInput">
          <b-form-input id="tokenInput"
                        v-model="form.token"
                        type="text"
                        placeholder="Enter token"/>
        </b-form-group>
      </b-col>
    </b-row>
    <div class="dropdown-divider"/>
    <div class="modal-footer">
      <b-button type="submit" variant="primary">Reset</b-button>
      <b-button variant="danger" @click="hideModal">Close</b-button>
    </div>
  </b-form>
</template>

<script>
  export default {
    name: "Reset",
    data() {
      return {
        form: {
          username: '',
          selected: null,
          options: [
            { value: null, text: 'Select ...' },
            { value: '0', text: 'User password' },
            { value: '1', text: 'Financial password' },
          ],
          token:''
        },
        responseErr:null,
        success:false,
        sending:false
      }
    },
    methods: {
      async onSubmit() {
        //evt.preventDefault();
        this.$validator.validateAll().then(success => {
          if (success)
            this.onSend()
        }).catch(e => {
          console.log(e)
        })
      },
      async onSend() {
        this.sending = true
        try {
          await this.$store.dispatch('reset', {
            username : this.form.username,
            type : this.form.selected,
            token : this.form.token
          }).then(() => {
            this.sending = false
            this.success = true
            this.clean()
          })
        } catch (e) {
          this.responseErr = e.message
        }
      },
      async clean () {
        const clear = async () => {
          this.form.username = ''
          this.form.select = null
          this.form.token = ''
          this.responseErr = null
        }
        await clear().then(() => {
          this.$validator.reset()
        })
      },
      hideModal () {
        this.$root.$emit('bv::hide::modal','modal')
      },
    }
  }
</script>

<style scoped>

</style>
