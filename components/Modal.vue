<template>
  <b-modal
    id="modal"
    :title="modalForm"
    :header-bg-variant="headerBgVariant"
    :header-text-variant="headerTextVariant"
    :body-bg-variant="bodyBgVariant"
    :body-text-variant="bodyTextVariant"
    :footer-bg-variant="footerBgVariant"
    :footer-text-variant="footerTextVariant" lazy>
    <b-container fluid>
      <keep-alive>
        <component :is="modalForm" @swap="onSwap"/>
      </keep-alive>
    </b-container>
    <div slot="modal-footer" class="w-100 d-flex justify-content-center">
      <b-btn v-if="modalForm === 'Login'" variant="link" @click="onSwap('Reset')">Reset Password</b-btn>
    </div>
  </b-modal>
</template>

<script>

  const components = {
    Register: () => import('./forms/Register'),
    Login: () => import('./forms/Login'),
    Reset: () => import('./forms/Reset'),
    Success: () => import('./forms/Success'),
    AddNote: () => import('./forms/AddNote'),
    EditNote: () => import('./forms/EditNote'),
  }

  export default {
    name: "Modal",
    components,
    data() {
      return {
        variants: [
          'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'
        ],
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'dark',
        footerTextVariant: 'dark',
      }
    },
    computed: {
      modalForm() {
        return this.$store.getters.modalFormName
      }
    },
    mounted() {
      components[this.modalForm]()
    },
    methods: {
      async onSwap(form) {
        await this.$store.dispatch('modal_form', {formName: form})
      },
    }
  }
</script>

<style scoped>

</style>
