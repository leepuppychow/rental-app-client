<template>
  <div class='modal'>
    <div class='modal-header'>
      <slot></slot>
      <p class="close-modal" @click="toggleModal">X</p>
    </div>
    <input type="text" v-model="payload.firstName" placeholder="First Name"/>
    <input type="text" v-model="payload.lastName" placeholder="Last Name"/>
    <input type="text" v-model="payload.email" placeholder="Email"/>
    <input type="text" v-model="payload.phone" placeholder="Phone"/>
    <input type="text" v-model="payload.venmo" placeholder="Venmo"/>
    <div>
      <label for="checkbox">Active tenant?</label>
      <input type="checkbox" v-model="payload.active">
    </div>
    <button @click="submitTenant(payload)">Submit</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['property', 'toggleModal', 'tenant'],
  computed: {
    payload() {
      return {
        firstName: this.tenant ? this.tenant.first_name : '',
        lastName: this.tenant ? this.tenant.last_name : '',
        email: this.tenant ? this.tenant.email : '',
        phone: this.tenant ? this.tenant.phone : '',
        venmo: this.tenant ? this.tenant.venmo : '',
        active: this.tenant ? this.tenant.active : true,
        tenantID: this.tenant ? this.tenant.id : null,
        propertyID: this.property.id,
        rent: this.tenant.rent,
      }
    }
  },
  methods: {
    ...mapActions([
      'createTenant',
      'updateTenant',
      'fetchTenants',
    ]),
    submitTenant(payload) {
      this.tenant ? this.updateTenant(payload) : this.createTenant(payload);
      this.fetchTenants();
      this.toggleModal();
    },
  },
}
</script>

<style lang="scss">
  @import '../styles/modal.scss';
</style>


