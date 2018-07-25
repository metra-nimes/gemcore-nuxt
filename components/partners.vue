<template>
  <div>
    <div v-if="partners === undefined" class="d-flex justify-content-center align-items-center flex-column">
      No personalPartners request example,only json data
      <code>{{ partners }}</code>
    </div>
    <div v-else-if="error !== null" class="d-flex justify-content-center align-items-center flex-column">
      <p class="text-danger text-center text-uppercase text-muted"> {{ error }}</p>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center flex-column">
      <p class="text-uppercase text-muted text-center">No partners found</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Partners",
    data () {
      return {
        partners: '',
        error: null
      }
    },
    computed: {
      authToken() {
        return this.$store.getters.authToken
      }
    },
    created() {
      this.getPartners()
    },
    methods: {
      async getPartners() {
        try {
          const partners = await this.$axios.$get('/user/personalPartners', {
            params: { token:  this.authToken }
          })
          this.partners = partners
        } catch (err) {
          this.error = err
          throw err
        }
      }
    }
  }
</script>

<style scoped>

</style>
