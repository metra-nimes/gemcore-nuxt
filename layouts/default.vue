<template>
  <div>
    <Header :title="PROJECT"/>
    <nuxt/>
  </div>
</template>

<script>
  import Header from '~/components/Header.vue'

  export default {
    components: {
      Header
    },
    data () {
      return {
        PROJECT : process.env.PROJECT
      }
    },
    mounted () {
      console.log(this.PROJECT)
    }
  }
</script>
