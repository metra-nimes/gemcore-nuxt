<template>
  <b-form @submit.prevent="onSubmit">
    <div class="text-capitalize text-center">
      <p v-if="responseErr !== null" class="text-danger"> {{ responseErr }}</p>
      <p v-else-if="sending">Changed...<i class="fa fa-spinner fa-spin fa-fw"/></p>
    </div>
    <b-row>
      <b-col md="12" sm="12">
        <b-form-group label="Old Password:"
                      label-for="oldPasswordInput">
          <b-form-input v-validate="'required'"
                        id="oldPasswordInput"
                        v-model="form.oldPassword"
                        :class="{'form-control': true, 'error': errors.has('Old Password') }"
                        type="password"
                        name="Old Password"
                        placeholder="Enter Old Password"/>
          <span v-show="errors.has('Old Password')" class="has-feedback">{{ errors.first('Old Password') }}</span>
        </b-form-group>
      </b-col>
      <b-col md="12" sm="12">
        <b-form-group label="New Password:"
                      label-for="newPasswordInput">
          <b-form-input v-validate="'required'"
                        id="newPasswordInput"
                        v-model="form.newPassword"
                        :class="{'form-control': true, 'error': errors.has('New Password') }"
                        type="password"
                        name="New Password"
                        placeholder="Enter New Password"/>
          <span v-show="errors.has('New Password')" class="has-feedback">{{ errors.first('New Password') }}</span>
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

    </b-row>
    <div class="dropdown-divider"/>
    <div class="modal-footer">
      <b-button type="submit" variant="primary">Change</b-button>
    </div>
  </b-form>
</template>

<script>
  export default {
    name: "ChangePassword",
    data() {
      return {
        form: {
          oldPassword: '',
          newPassword: '',
          selected: null,
          options: [
            { value: null, text: 'Select ...' },
            { value: '0', text: 'User password' },
            { value: '1', text: 'Financial password' },
          ],
        },
        responseErr:null,
        sending:false
      }
    },
    computed: {
      authToken() {
        return this.$store.getters.authToken
      },
    },
    methods: {
      async onSubmit() {
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
            await this.$axios.$post('/user/changePassword',{
              oldPassword : this.form.oldPassword,
              newPassword : this.form.newPassword,
              type : this.form.selected,
              token : this.authToken
            })
            this.sending = false
            this.$toast.success('Password Changed',{duration:3000,position:'bottom-right'})
            this.$emit('collapse',false)
        } catch (e) {
          this.responseErr = e.message
          this.sending = false
          throw e
        }
      },

    }
  }
</script>

<style scoped>

</style>
