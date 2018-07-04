<template>
  <div class="property-tenants">
    <h3>TENANTS:</h3>
    <table class="tenant-table">
        <tr class="table-header">
            <th>Name</th>
            <th>Email</th>
            <th>Paid?</th>
            <th>Active?</th>
            <th>Edit</th>
            <th>Remove</th>
        </tr>
        <TenantRow 
            v-for="tenant in activeTenants" 
            :tenant="tenant" 
            :key="tenant.id"
            :property="property"
        />
        <TenantRow 
            v-if="displayInactiveTenants"
            v-for="tenant in inactiveTenants" 
            :tenant="tenant" 
            :key="tenant.id"
            :property="property"
        />
    </table>
    <div>
        <label for="checkbox">Show Past Tenants</label>
        <input type="checkbox" id="checkbox" v-model="displayInactiveTenants">
    </div>
  </div>
</template>

<script>
import TenantRow from './TenantRow';

export default {
  props: ['activeTenants', 'inactiveTenants', 'property'],
  components: {
    TenantRow,
  },
  data() {
    return {
      displayInactiveTenants: false,
    }
  },
}
</script>

<style>

</style>


