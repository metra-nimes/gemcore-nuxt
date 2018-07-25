<template>
  <div class="m-4">
    Page {{ page.title }}
    <component :is="'Notes'"/>
  </div>
</template>

<script>

/*  const components = {
    notes: () => import('../../components/Notes'),
    partners: () => import('../../components/Partners'),
    settings: () => import('../../components/Settings'),
  }*/
  const getPage = (slug) => {
    component: import('@/components/${slug}')
  }

  export default {
    middleware: 'auth',
    head() {
      return {
        title: this.name
      }
    },
    asyncData({ params,env ,error }) {
      const page = env.dashboard.pages.find((page) => String(page.slug) === params.id)
      if (!page) {
        return error({ message: 'Page not found', statusCode: 404 })
      }


      return  { page: page }
    },
    beforeCreate() {
      this.component = () => getPage(this.page.slug)
    }
  }
</script>

<style scoped>

</style>
