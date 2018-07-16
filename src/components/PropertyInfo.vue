<template>
  <div class="property-info">
      <h3>{{propertyAddress}}</h3>
      <table>
          <tr class="table-header">
            <th>Room</th>
            <th>Rent</th>
            <th>Utilities</th>
            <th>Total Due</th>
            <th>Edit Room/Rent</th>
            <th>Tenant</th>
            <th>Email</th>
            <th>Paid?</th>
            <th>Active?</th>
            <th>Edit Tenant</th>
            <th>Tenant Moving</th>
          </tr>
          <RoomTenantRow 
            v-for="roomTenant in activeTenantRooms" 
            :splitBillsAmount="splitBillsAmount"
            :roomTenant="roomTenant" 
            :key="roomTenant.id"
            :property="property"
          />
          <RoomTenantRow 
            v-if="displayInactiveTenants"
            v-for="roomTenant in inactiveTenantRooms" 
            :splitBillsAmount="splitBillsAmount"
            :roomTenant="roomTenant" 
            :key="roomTenant.id"
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
import RoomTenantRow from './RoomTenantRow';
import { mapActions } from 'vuex';

export default {
  props: [
    'property', 
    'totalDueThisMonth', 
    'splitBillsAmount',
  ],
  components: {
    RoomTenantRow,
  },
  data() {
    return {
      displayInactiveTenants: false,
    }
  },
  computed: {
    propertyAddress() {
      return `${this.property.street} ${this.property.city}, ${this.property.state}`;
    },
    rooms() {
      return this.$store.getters.rooms;
    },
    tenants() {
      return this.$store.getters.tenants;
    },
    roomsWithTenants() {
      return this.rooms.map(room => {
        let tenant = this.tenants.find(tenant => tenant.id === room.tenant_id);
        return { ...room, ...tenant };
      });
    },
    activeTenantRooms() {
        return this.roomsWithTenants.filter(tenant => tenant.active);
    },
    inactiveTenantRooms() {
        return this.roomsWithTenants.filter(tenant => !tenant.active);
    },
    currentMonth() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentMonth = new Date().getMonth();
        return months[currentMonth].toUpperCase();
    },
  },
  methods: {
    ...mapActions([
      'fetchRooms',
      'fetchTenants',
    ]),
  },
  mounted() {
    this.fetchRooms(this.property.id);
    this.fetchTenants;
  },
}
</script>

<style>

</style>




