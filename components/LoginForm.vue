<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="usernameInputGroup"
                    label="Username:"
                    label-for="usernameInput">
        <b-form-input id="usernameInput"
                      type="text"
                      v-model="form.username"
                      required
                      placeholder="Enter username">
        </b-form-input>
      </b-form-group>
      <b-form-group id="passwordInputGroup"
                    label="Password:"
                    label-for="passwordInput">
        <b-form-input id="passwordInput"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          username: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault();
        //const { data } = await this.$axios.$get(process.env.DEV_API+'/auth/', { this.form.username, this.form.pwd })
        try {
          await this.$store.dispatch('login',  {
            username: this.form.username,
            password: this.form.password
          })
        } catch (e) {
          alert(e.message)
        }
      },
      onReset (evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.username = '';
        this.form.password = '';
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => { this.show = true });
      }
    }
  }
</script>

<style scoped>

</style>
