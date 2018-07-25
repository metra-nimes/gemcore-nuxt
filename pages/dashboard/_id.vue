<template>
  <div class="m-4">
    <component :is="component" />
  </div>
</template>

<script>

  const getPage= (slug) => ({
    component: import(`@/components/${slug}`)
  })

  export default {
    middleware: 'auth',
    head() {
      return {
        title: this.name
      }
    },
    beforeCreate() {
      this.component = () => getPage(this.$route.params.id)
    },
  }
</script>

<style scoped>

</style>
