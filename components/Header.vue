<template>
  <header class="header">
    <b-navbar toggleable="md" type="dark" variant="dark">

      <b-navbar-toggle target="nav_collapse"/>

      <b-navbar-brand class="font-weight-bold">{{ title }}</b-navbar-brand>

      <b-collapse id="nav_collapse" is-nav>

        <b-navbar-nav class="ml-auto">
          <b-button-group right>
            <b-button v-if="!isLoggedIn" id="Register" class="font-weight-bold" variant="link" @click="showModal($event)">Sign Up
            </b-button>
            <b-button v-if="!isLoggedIn" id="Login" class="font-weight-bold" variant="link" @click="showModal($event)">
              Sign In
            </b-button>
            <b-button v-if="isLoggedIn" class="font-weight-bold" variant="link" @click="logoutUser">Logout</b-button>
          </b-button-group>

          <Modal/>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
  import Modal from './Modal'

  export default {
    name: "Header",
    components: {
      Modal
    },
    props: {
      title: {
        type: [String, Boolean],
        default: false
      },
    },
    data: function () {
      return {
        form_type: 'Register'
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLogged
      }
    },
    methods: {
      async showModal (e) {
        await this.$store.dispatch('modal_form', {formName: e.currentTarget.id})
        this.$root.$emit('bv::show::modal','modal')
      },
      async logoutUser() {
        try {
          await this.$store.dispatch('logout').then(() => {
            window.location.reload(true)
          })
        } catch (e) {
          console.log(e.message)
        }
      }
    },
  }
</script>

<style scoped>

</style>
