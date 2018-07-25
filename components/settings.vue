<template>
  <div>
    <div class="d-flex flex-column">
      <b-btn :class="showCollapse ? 'collapsed' : null"
             :aria-expanded="showCollapse ? 'true' : 'false'"
             aria-controls="collapse4"
             variant="primary"
             @click="toggleCollapse((showCollapse) ? false : true)">
        Change Password
      </b-btn>
      <b-collapse id="collapse4" v-model="showCollapse" class="mt-2">
        <b-card>
          <ChangePassword @collapse="toggleCollapse"/>
        </b-card>
      </b-collapse>
      <div class="dropdown-divider"/>
      <b-btn v-b-toggle.collapse1 variant="primary">User Info</b-btn>
      <b-collapse id="collapse1" class="mt-2">
        <b-card>
          <table responsive class="table table-striped  table-bordered table-sm table-responsive">
            <thead>
              <tr>
                <th v-for="field in fields" :key="field" scope="col" class="text-center text-white text-uppercase bg-dark">{{ field }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.key">
                <th scope="row" class="bg-primary text-center">{{ item.key }}</th>
                <th scope="row" class="text-center">{{ item.value }}</th>
              </tr>
            </tbody>
          </table>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
  import ChangePassword from './forms/ChangePassword'

  export default {
    name: "Settings",
    components: {
      ChangePassword
    },
    data () {
      return {
        fields: [ 'name', 'value' ],
        items: this.$store.getters.userProperties,
        showCollapse: false
      }
    },
    mounted() {
      this.items = Object.entries(this.$store.getters.userProperties).map(([key, value]) => ({key,value}))
    },
    methods: {
      toggleCollapse(state) {
        console.log('toggle')
        this.showCollapse = state
      }
    }
  }
</script>

<style scoped>

</style>
