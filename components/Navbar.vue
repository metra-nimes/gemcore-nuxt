<template>
  <b-navbar toggleable="md" type="dark" variant="dark">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">{{project_name}}</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav class="ml-auto">

        <b-btn  v-b-modal.login_modal variant="success" right>Login</b-btn>
        <b-modal id="login_modal" title="Login">
          <LoginForm/>
        </b-modal>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>

          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  import LoginForm from './LoginForm.vue'

  export default {
    components: {
      LoginForm
    },
    data (context) {
      return {
        project_name : process.env.PROJECT
      }
    }
  }
</script>

<style scoped>

</style>
