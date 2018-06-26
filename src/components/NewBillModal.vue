<template>
  <div class='modal'>
    <div class='modal-header'>
      <h3>Add New Bill</h3>
      <p class="close-modal" @click="toggleModal">X</p>
    </div>
    <input type="text" v-model="payload.type" placeholder="Type"/>
    <input type="date" v-model="payload.date" placeholder="Date"/>
    <input type="number" v-model="payload.amount" placeholder="Amount"/>
    <button @click="newBill(payload)">Submit</button>
  </div>
  
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['propertyID', 'toggleModal'],
  data() {
    return {
      payload: {
        type: "",
        date: "",
        amount: 0,
        propertyID: this.propertyID,
      }
    }
  },
  methods: {
    ...mapActions([
      'createNewBill',
    ]),
    newBill(payload) {
      this.createNewBill(payload);
      this.toggleModal();
    },
  },
}
</script>

<style lang="scss">
  @import '../styles/modal.scss';
</style>


