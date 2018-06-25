<template>
  <div class="bill" :id="bill.id">
    <p>{{bill.type}}: {{bill.amount}} for {{bill.date}}</p>
  </div>
  
</template>

<script>
export default {
  props: ['bill'],
}
</script>

<style>

</style>


