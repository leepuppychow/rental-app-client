<template>
  <div class='new-bill-modal'>
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

  .new-bill-modal {
    z-index: 2;
    position: absolute;
    float: left;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    max-height: 250px;
    border: solid black 1px;
    background: lightcoral;
    display: flex;
    flex-direction: column;
    align-items: center;

      .modal-header {
        width: 95%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .close-modal {
          border: dotted black 1px;
          padding: 3px 5px 0px;
        }
      }
    
      input, button {
        max-width: 250px;
        margin-bottom: 10px;
      }
  }

</style>


