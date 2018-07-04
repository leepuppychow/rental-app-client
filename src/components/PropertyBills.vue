<template>
  <div class="property-bills">
      <h3>BILLS:</h3>
      <table class="bill-table">
          <tr class="table-header">
              <th>Bill Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Shared?</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
          <BillRow 
              v-for="bill in bills" 
              :property="property"
              :bill="bill" 
              :key="bill.id"
          />    
      </table>
  </div>
</template>

<script>
import BillRow from './BillRow';

export default {
  props: ['bills', 'property'],
  components: {
    BillRow,
  }
}
</script>

<style>

</style>


