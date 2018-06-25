<template>
  <div>
    <p> {{tenant.first_name}} {{tenant.last_name}}: {{tenant.email}} </p>
    <p>Bill status: {{tenant.status}}</p>
  </div>
</template>

<script>
export default {
  props: ['tenant'],
}
</script>

<style>

</style>

