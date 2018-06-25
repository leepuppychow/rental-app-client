<template>
  <div class="bill" :id="bill.id">
    <p>
      {{bill.type}}: {{bill.amount}} for {{this.processedDate()}}
      <button @click="deleteBill(bill.id)">DELETE</button>
    </p>
  </div>
  
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['bill'],
  methods: {
    ...mapActions([
      'deleteBill',
    ]),
    processedDate() {
      let date = new Date(this.bill.date) 
      return date.toDateString();
    }
  },
}
</script>

<style>

</style>


