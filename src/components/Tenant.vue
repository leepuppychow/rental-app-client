<template>
  <div>
    {{tenant.first_name}} {{tenant.last_name}}: {{tenant.email}}</br>
    Bill status: {{tenant.status}}</br>
    <button v-if="tenant.active" @click="toggleTenantActive(payload(false))">Archive</button>
    <button v-if="!tenant.active" @click="toggleTenantActive(payload(true))">Reactivate Tenant</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['tenant'],
  methods: {
    ...mapActions([
      "toggleTenantActive",
    ]),
    payload(active) {
      return {
        tenantID: this.tenant.id,
        active,
      }
    }
  },
}
</script>

<style>

</style>

