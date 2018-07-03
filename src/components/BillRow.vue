<template>
  <tr class="bill-row" :key="bill.id">
      <th>{{bill.type}}</th>
      <th>{{bill.amount}}</th>
      <th>{{this.processedDate()}}</th>
      <th>{{bill.shared}}</th>
      <th><button @click="toggleBillModal">EDIT</button></th>
      <th><button @click="deleteBill(bill.id)">DELETE</button></th>
      <BillModal 
        v-if="showBillModal"
        :toggleModal="toggleBillModal"
        :bill="bill"
      >
        <h3>Edit Bill</h3>
      </BillModal>
  </tr>
</template>

<script>
import { mapActions } from 'vuex';
import BillModal from './BillModal';

export default {
  props: ['bill', 'property'],
  components: {
    BillModal,
  },
  data() {
    return {
      showBillModal: false,
    }
  },
  methods: {
    ...mapActions([
      'deleteBill',
    ]),
    processedDate() {
      let date = new Date(this.bill.date) 
      return date.toDateString();
    },
    toggleBillModal() {
      this.showBillModal = !this.showBillModal;
    },
  },
}
</script>

<style>

</style>


