<template>
  <div class="property-actions">
    <h3>ACTIONS:</h3>
    <button class="action-button" @click="sendBillEmail(mailerInfo)">Send Bill Email to Tenants</button>
    <button class="action-button" @click="toggleNewTenantModal()">
        Add New Tenant 
    </button>
    <button class="action-button" @click="toggleNewBillModal()">
        Add New Bill
    </button>
    <button class="action-button" >
        Edit Property
    </button>
    <button class="action-button danger" @click="deleteProperty(property.id)">
        Remove Property
    </button>
    <input v-model="rentAmount" type="number" />
    <button class="action-button" @click="setRent({ property: property, rent: rentAmount })">
        Set Rent
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: [
    'property', 
    'rentAmount', 
    'toggleNewTenantModal', 
    'toggleNewBillModal',
    'mailerInfo',
  ],
  methods: {
    ...mapActions([
      'sendBillEmail',
      'deleteProperty',
      'setRent',
    ]),
  },
  
}
</script>

<style>

</style>


