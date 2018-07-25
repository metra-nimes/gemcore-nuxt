<template>
  <b-form @submit.prevent="onSubmit">
    <div class="text-capitalize text-center">
      <p v-if="responseErr !== null" class="text-danger"> {{ responseErr }}</p>
      <p v-else-if="sending">Login...<i class="fa fa-spinner fa-spin fa-fw"/></p>
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
          <span v-show="errors.has('username')" class="has-feedback">{{ errors.first("username") }}</span>
        </b-form-group>
      </b-col>
      <b-col md="12" sm="12">
        <b-form-group label="Password:"
                      label-for="passwordInput">
          <b-form-input v-validate="'required'"
                        id="passwordInput"
                        v-model="form.password"
                        :class="{'form-control': true, 'error': errors.has('password') }"
                        type="password"
                        name="password"
                        placeholder="Enter password"/>
          <span v-show="errors.has('password')" class="has-feedback">{{ errors.first("password") }}</span>
        </b-form-group>
      </b-col>
    </b-row>
    <div class="dropdown-divider"/>
    <div class="modal-footer">
      <b-button type="submit" variant="primary">
        Login
      </b-button>
      <b-button variant="danger" @click="hideModal">Close</b-button>
    </div>
  </b-form>
</template>

<script>

  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: '',
          password: '',
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
          await this.$store.dispatch('login',  {
            username: this.form.username,
            password: this.form.password
          }).then(() => {
            this.sending = false
            this.$root.$emit('bv::hide::modal','modal')
            this.clean()
            window.location.reload(true)
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
          this.form.username = ''
          this.form.password = ''
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
