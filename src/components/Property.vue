<template>
    <div class="property">
        <h3>{{ property.name }}</h3>
        <hr/>
        <h5>{{ property.street }}</h5>
        <h5>{{ property.city + ', ' + property.state }}</h5>
        <h5>Current Rental Rate: {{property.amount || 'none'}} </h5>
        <h5>Current Split Utilities Bills: {{splitBillsAmount || 'none'}} </h5>
        <h5>TOTAL DUE (***month***): {{this.totalDueThisMonth()}} </h5>
        <button @click="sendBillEmail(mailerInfo())">Send Bill Email to Tenants</button>
        <br/>

        <input v-model="rentAmount" type="number" />
        <button @click="setRent({ propertyID: property.id, rent: rentAmount })">
            Set Rent
        </button>

        <h5>Bills:</h5>
        <button @click="toggleNewBillModal()">
            Add New Bill 
        </button>
        <NewBillModal 
            :propertyID="property.id" 
            :toggleModal="toggleNewBillModal"
            v-if="showNewBillModal"
        />

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
import NewBillModal from './NewBillModal';

export default {
    name: 'Property',
    props: ['property', 'tenants', 'bills'],
    data() {
        return {
            rentAmount: this.property.amount,
            splitBillsAmount: 0,
            showNewBillModal: false,
        }
    },
    components: {
        Tenant,
        Bill,
        NewBillModal,
    },
    methods: {
        ...mapActions([
            'deleteProperty',
            'fetchProperties',
            'setRent',
            'setTenantBillsForProperty',
            'sendBillEmail',
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
        toggleNewBillModal() {
            this.showNewBillModal = !this.showNewBillModal;
        },
        mailerInfo() {
            return {
                tenants: this.tenants,
                totalDue: this.totalDueThisMonth(),
                bills: this.bills,
            }
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


