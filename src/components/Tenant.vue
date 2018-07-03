<template>
  <div>
    <p> {{tenant.first_name}} {{tenant.last_name}}: {{tenant.email}}</p>
    <p>Bill status: {{tenant.status}}</p>
    <button @click="archiveTenant(tenant.id)">Archive</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions([
      "archiveTenant",
    ]),
  },
  props: ['tenant'],
}
</script>

<style>

</style>

