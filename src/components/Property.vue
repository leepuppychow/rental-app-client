<template>
    <div class="property">
        <h3>{{ property.name }}</h3>
        <hr/>
        <h5>{{ property.street }}</h5>
        <h5>{{ property.city + ', ' + property.state }}</h5>
        <h5>Current Rental Rate: {{property.amount || 'none'}} </h5>
        <h5>Current Split Utilities Bills: {{splitBillsAmount || 'none'}} </h5>
        <h5>TOTAL DUE (***month***): {{this.totalDueThisMonth()}} </h5>
        <input v-model="rentAmount" type="number" />
        <button @click="setRent({ propertyID: property.id, rent: rentAmount })">
            Set Rent
        </button>

        <h5>Bills:</h5>
        <Bill v-for="bill in bills" :bill="bill" :key="bill.id"/>

        <h5>Tenants:</h5>
        <Tenant v-for="tenant in tenants" :tenant="tenant" :key="tenant.id"/>

        <hr/>
        <button @click="deleteProperty(property.id)">
            Remove Property
        </button>
    </div>
    
</template>

<script>
import { mapActions } from 'vuex';
import Tenant from './Tenant';
import Bill from './Bill';

export default {
    name: 'Property',
    props: ['property', 'tenants', 'bills'],
    data() {
        return {
            rentAmount: this.property.amount,
            splitBillsAmount: 0,
        }
    },
    components: {
        Tenant,
        Bill,
    },
    methods: {
        ...mapActions([
            'deleteProperty',
            'fetchProperties',
            'setRent',
            'setTenantBillsForProperty',
        ]),
        divideBillsAmongTenants() {
            const totalOfBills = this.bills.reduce((sum, bill) => sum += bill.amount, 0);
            const numberOfTenants = this.tenants.length;
            const splitAmount = totalOfBills / numberOfTenants;
            const payload = {
                propertyID: this.property.id,
                splitAmount: splitAmount,
            }

            if (splitAmount) {
                this.setTenantBillsForProperty(payload);
                this.splitBillsAmount = splitAmount;
            };
        },
        totalDueThisMonth() {
            return this.property.amount + this.splitBillsAmount;
        },
    },
    computed: {
        tenantsAndBills() {
            return this.$store.getters.tenantsLoaded && this.$store.getters.billsLoaded;
        },
    },
    watch: {
        tenantsAndBills: function(bothLoaded) {
            if (bothLoaded) this.divideBillsAmongTenants();
        },
    },
}
</script>

<style lang="scss">
    .property {
        border: solid blue 1px;
        width: 75%;
        height: 80%;
        margin: auto;
        margin-bottom: 40px;
    }
</style>


