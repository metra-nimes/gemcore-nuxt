<template>
  <b-container fluid>
    <b-row>
      <b-col md="3" sm="12">
        <b-list-group class="m-4" >
          <b-list-group-item v-for="page in pages" :key="page.title" :to="'/'+slug+'/'+page.slug" class="bg-dark text-white text-uppercase font-weight-bold">
            {{ page.title }}
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col md="9" sm="12">
        <nuxt-child :key="$route.params.id" :test="'test'"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import dashboard from '../config/dashboard'

  const localDashboard = dashboard

  export default {
    name: "Dashboard",
    middleware: 'auth',
    data() {
      return {
        pages: localDashboard.pages,
        slug: localDashboard.slug,
      }
    },
    async fetch ({ store }) {
      if (store.getters.userProperties === null) {
        try {
          await store.dispatch('user', store.getters.authToken)
        } catch (e) {
          console.log(e)
        }
      }
    },
    computed: {
      authToken() {
        return this.$store.getters.authToken
      }
    },
    mounted() {

    },
  }

</script>

<style scoped>

</style>
