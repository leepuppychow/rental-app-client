<template>
  <div class="property-info">
      <h3>PROPERTY INFO:</h3>
      <table>
          <tr>
              <th>Address:</th>
              <th>{{property.street + " " + property.city + ', ' + property.state}}</th>
          </tr>
          <tr>
              <th>Current Rental Rate:</th>
              <th>{{property.rent || 'none'}}</th>
          </tr>
          <tr>
              <th>Current Split Utilities:</th>
              <th>{{splitBillsAmount || 'none'}}</th>
          </tr>
          <tr>
              <th>TOTAL DUE ({{currentMonth}}):</th>
              <th>{{totalDueThisMonth}}</th>
          </tr>
      </table>
  </div>
</template>

<script>
export default {
  props: ['property', 'totalDueThisMonth'],

}
</script>

<style>

</style>


