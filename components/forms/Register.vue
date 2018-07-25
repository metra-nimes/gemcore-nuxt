<template>
  <b-form @submit.prevent="onSubmit">
    <div class="text-capitalize text-center">
      <p v-if="responseErr !== null" class="text-danger"> {{ responseErr }}</p>
      <p v-else-if="sending">Register...<i class="fa fa-spinner fa-spin fa-fw"/></p>
    </div>
    <b-row>
      <b-col md="4" sm="12">
        <b-form-group label="Sponsor:"
                      label-for="sponsorInput">
          <b-form-input v-validate="'required'"
                        id="sponsorInput"
                        v-model="form.sponsor"
                        :class="{'form-control': true, 'error': errors.has('sponsor') }"
                        type="text"
                        name="sponsor"
                        placeholder="Enter sponsor"/>
          <span v-show="errors.has('sponsor')" class="has-feedback">{{ errors.first("sponsor") }}</span>
        </b-form-group>
      </b-col>
      <b-col md="4" sm="12">
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
      <b-col md="4" sm="12">
        <b-form-group :class="{'has-danger': errors.has('email') }"
                      label="Email:"
                      label-for="emailInput">
          <b-form-input v-validate="'required|email'"
                        id="emailInput"
                        v-model="form.email"
                        :class="{'form-control': true, 'error': errors.has('email') }"
                        type="email"
                        name="email"
                        placeholder="Enter email"/>
          <span v-show="errors.has('email')" class="has-feedback">{{ errors.first("email") }}</span>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" sm="12">
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
      <b-col md="6" sm="12">
        <b-form-group label="Financial Password:"
                      label-for="finPasswordInput">
          <b-form-input v-validate="'required'"
                        id="finPasswordInput"
                        v-model="form.finPassword"
                        :class="{'form-control': true, 'error': errors.has('financial password') }"
                        type="password"
                        name="financial password"
                        placeholder="Enter financial password"/>
          <span v-show="errors.has('financial password')"
                class="has-feedback">{{ errors.first("financial password") }}</span>
        </b-form-group>
      </b-col>
    </b-row>
    <div class="dropdown-divider"/>
    <b-row>
      <b-col md="6" sm="12">
        <b-form-group label="First Name:"
                      label-for="firstNameInput">
          <b-form-input v-validate="'required'"
                        id="firstNameInput"
                        v-model="form.firstName"
                        :class="{'form-control': true, 'error': errors.has('first name') }"
                        type="text"
                        name="first name"
                        placeholder="Enter first name"/>
          <span v-show="errors.has('first name')" class="has-feedback">{{ errors.first("first name") }}</span>
        </b-form-group>
      </b-col>
      <b-col md="6" sm="12">
        <b-form-group label="Second Name:"
                      label-for="secondNameInput">
          <b-form-input v-validate="'required'"
                        id="secondNameInput"
                        v-model="form.secondName"
                        :class="{'form-control': true, 'error': errors.has('second name') }"
                        type="text"
                        name="second name"
                        placeholder="Enter second name"/>
          <span v-show="errors.has('second name')" class="has-feedback">{{ errors.first("second name") }}</span>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="4" sm="12">
        <b-form-group label="Phone:"
                      label-for="phoneInput">
          <b-form-input v-validate="'required|digits:11'"
                        id="phoneInput"
                        v-model="form.phone"
                        :class="{'form-control': true, 'error': errors.has('phone') }"
                        type="text"
                        name="phone"
                        placeholder="Enter phone"/>
          <span v-show="errors.has('phone')" class="has-feedback">{{ errors.first("phone") }}</span>
        </b-form-group>
      </b-col>
      <b-col md="4" sm="12">
        <b-form-group label="Country (ISO):"
                      label-for="countryInput">
          <b-form-input v-validate="'required'"
                        id="countryInput"
                        v-model="form.country"
                        :class="{'form-control': true, 'error': errors.has('country') }"
                        type="text"
                        name="country"
                        placeholder="Enter country"/>
          <span v-show="errors.has('country')" class="has-feedback">{{ errors.first("country") }}</span>
        </b-form-group>
      </b-col>
      <b-col md="4" sm="12">
        <b-form-group label="Skype:"
                      label-for="skypeInput">
          <b-form-input id="skypeInput"
                        v-model="form.skype"
                        type="text"
                        placeholder="Enter skype"/>
        </b-form-group>
      </b-col>
    </b-row>
    <div class="dropdown-divider"/>
    <div class="modal-footer">
      <b-button type="submit" variant="primary">Register</b-button>
      <b-button variant="danger" @click="hideModal">Close</b-button>
    </div>
  </b-form>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        form: {
          sponsor:'testareg1',
          username: '',
          email: '',
          firstName:'',
          secondName:'',
          phone:'',
          country:'RU',
          password: '',
          finPassword: '',
          skype:''
        },
        responseErr:null,
        sending:false
      }
    },
    methods: {
      async onSubmit() {
        //evt.preventDefault()
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
          await this.$store.dispatch('register', JSON.stringify(this.form)).then(() => {
            this.sending = false
            this.$root.$emit('bv::hide::modal','modal')
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
    }
  }
</script>

<style scoped>

</style>
