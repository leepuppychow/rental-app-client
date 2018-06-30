<template>
  <div class="bill" :id="bill.id">
    <div>
      {{bill.type}}: {{bill.amount}} for {{this.processedDate()}}
      <button @click="toggleBillModal">EDIT</button>
      <button @click="deleteBill(bill.id)">DELETE</button>
    </div>
    <BillModal 
      v-if="showBillModal"
      :toggleModal="toggleBillModal"
      :bill="bill"
    >
      <h3>Edit Bill</h3>
    </BillModal>
  </div>
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


