<template>
  <div class="bill" :id="bill.id">
    <p>{{bill.type}}: {{bill.amount}} for {{processedDate}}</p>
  </div>
  
</template>

<script>
export default {
  props: ['bill'],
  computed: {
    processedDate() {
      let date = new Date(this.bill.date) 
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  },
}
</script>

<style>

</style>


