<template>
  <b-container class="d-flex justify-content-center align-items-center main-container flex-column">
    <h1 class="text-uppercase font-weight-bold">GEMCORE-NUXT TASK</h1>
    <h2>
      <b-link :href="git"><i class="fa fa-github fa-2x" aria-hidden="true"/>&nbsp;GEMCORE-NUXT</b-link>
    </h2>
  </b-container>
</template>

<script>

export default {
  components: {
  },
  middleware: 'login',
  data () {
    return {
      git : process.env.GIT
    }
  },
}
</script>
<style>
  .main-container {
    height: 80vh;
  }
</style>
