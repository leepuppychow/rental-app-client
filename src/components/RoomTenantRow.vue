<template>
  <tr class="room-tenant-row">
      <th>{{roomTenant.name}}</th>
      <th>{{roomTenant.rent}}</th>
      <th>{{splitBillsAmount}}</th>
      <th>{{roomTenant.rent + splitBillsAmount}}</th>
      <th>
        <button @click="toggleRoomModal">Edit</button>
      </th>
      <th>{{roomTenant.first_name}} {{roomTenant.last_name}}</th>
      <th>{{roomTenant.email}}</th>
      <th>{{roomTenant.status}}</th>
      <th>{{roomTenant.active}}</th>
      <th>
        <button @click="toggleTenantModal">Edit</button>
      </th>
      <th>
        <button v-if="roomTenant.active" @click="toggleTenantActive(payload(false))">Moving Out</button>
        <button v-if="!roomTenant.active" @click="toggleTenantActive(payload(true))">Moving Back In</button>    
      </th>
      <TenantModal 
        :property="property" 
        :tenant="roomTenant"
        :toggleModal="toggleTenantModal"
        v-if="showTenantModal"
      >
        <h3>Edit Tenant</h3>
      </TenantModal>
      <RoomModal
        :room="roomTenant"
        :property="property" 
        :toggleModal="toggleRoomModal"
        v-if="showRoomModal"
      >
        <h3>Edit Room and/or Rent</h3>
      </RoomModal>
  </tr>
</template>

<script>
import { mapActions } from 'vuex';
import TenantModal from './TenantModal';
import RoomModal from './RoomModal';

export default {
  props: ['roomTenant', 'property', 'splitBillsAmount'],
  components: {
    TenantModal,
    RoomModal,
  },
  data() {
    return {
      showTenantModal: false,
      showRoomModal: false,
    }
  },
  methods: {
    ...mapActions([
      "toggleTenantActive",
      "updateRoom",
    ]),
    toggleTenantModal() {
      this.showTenantModal = !this.showTenantModal;
    },
    toggleRoomModal() {
      this.showRoomModal = !this.showRoomModal;
    },
    setRent() {
      this.updateRoom
    },
    payload(active) {
      return {
        tenantID: this.roomTenant.id,
        propertyID: this.property.id,
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
  .set-rent-link{
    text-decoration: underline;
  }

</style>

