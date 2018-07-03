<template>
  <tr class="tenant-row">
      <th>{{tenant.first_name}} {{tenant.last_name}}</th>
      <th>{{tenant.email}}</th>
      <th>{{tenant.status}}</th>
      <th>{{tenant.active}}</th>
      <th>
        <button>Edit</button>
      </th>
      <th>
        <button v-if="tenant.active" @click="toggleTenantActive(payload(false))">Archive</button>
        <button v-if="!tenant.active" @click="toggleTenantActive(payload(true))">Reactivate Tenant</button>    
      </th>
  </tr>
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
  th {
    padding: 4px;
    font-size: 14px;
    font-weight: 200;
  }

</style>

