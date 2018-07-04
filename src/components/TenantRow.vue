<template>
  <tr class="tenant-row">
      <th>{{tenant.first_name}} {{tenant.last_name}}</th>
      <th>{{tenant.email}}</th>
      <th>{{tenant.status}}</th>
      <th>{{tenant.active}}</th>
      <th>
        <button @click="toggleTenantModal">Edit</button>
      </th>
      <th>
        <button v-if="tenant.active" @click="toggleTenantActive(payload(false))">Moving Out</button>
        <button v-if="!tenant.active" @click="toggleTenantActive(payload(true))">Moving Back In</button>    
      </th>
      <TenantModal 
        :property="property" 
        :tenant="tenant"
        :toggleModal="toggleTenantModal"
        v-if="showTenantModal"
      >
        <h3>Edit Tenant</h3>
      </TenantModal>
  </tr>
</template>

<script>
import { mapActions } from 'vuex';
import TenantModal from './TenantModal';

export default {
  props: ['tenant', 'property'],
  components: {
    TenantModal,
  },
  data() {
    return {
      showTenantModal: false,
    }
  },
  methods: {
    ...mapActions([
      "toggleTenantActive",
    ]),
    toggleTenantModal() {
      this.showTenantModal = !this.showTenantModal;
    },
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

