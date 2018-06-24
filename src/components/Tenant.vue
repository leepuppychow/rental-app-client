<template>
  <div>
    <p> {{tenant.first_name}} {{tenant.last_name}}: {{tenant.email}} </p>
  </div>
</template>

<script>
export default {
  props: ['tenant'],
}
</script>

<style>

</style>

