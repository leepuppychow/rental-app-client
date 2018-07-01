<template>
  <div class='modal'>
    <div class='modal-header'>
      <slot></slot>
      <p class="close-modal" @click="toggleModal">X</p>
    </div>
    <input type="text" v-model="payload.type" placeholder="Type"/>
    <input type="date" v-model="payload.date" placeholder="Date"/>
    <input type="number" v-model="payload.amount" placeholder="Amount"/>
    <button @click="submitBill(payload)">Submit</button>
  </div>
  
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['propertyID', 'toggleModal', 'bill'],
  computed: {
    payload() {
      return {
        type: this.bill ? this.bill.type : '',
        date: this.bill ? this.bill.date : '',
        amount: this.bill ? this.bill.amount : 0,
        propertyID: this.bill ? this.bill.property_id : this.propertyID,
        billID: this.bill ? this.bill.id : null,
      }
    }
  },
  methods: {
    ...mapActions([
      'createNewBill',
      'updateBill',
      'fetchBills',
    ]),
    submitBill(payload) {
      this.bill ? this.updateBill(payload) : this.createNewBill(payload);
      this.fetchBills();
      this.toggleModal();
    },
  },
}
</script>

<style lang="scss">
  @import '../styles/modal.scss';
</style>


