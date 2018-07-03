<template>
    <div class="property">
        <div class="property-info">
            <h2>{{ property.name }}</h2>
            <h5>{{ property.street + " " + property.city + ', ' + property.state }}</h5>
            <h5>Current Rental Rate: {{property.amount || 'none'}} </h5>
            <h5>Current Split Utilities Bills: {{splitBillsAmount || 'none'}} </h5>
            <h5>TOTAL DUE ({{currentMonth}}): {{totalDueThisMonth()}} </h5>
        </div>

        <div class="property-actions">
            <h4>ACTIONS:</h4>
            <button @click="sendBillEmail(mailerInfo())">Send Bill Email to Tenants</button>
            <button @click="toggleNewBillModal()">
                Add New Bill 
            </button>
            <button class="danger" @click="deleteProperty(property.id)">
                Remove Property
            </button>
            <input v-model="rentAmount" type="number" />
            <button @click="setRent({ propertyID: property.id, rent: rentAmount })">
                Set Rent
            </button>
        </div>

        <div class="property-bills">
            <h4>BILLS:</h4>
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

        <div class="property-tenants">
            <h4>TENANTS:</h4>
            <table class="tenant-table">
                <tr class="table-header">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Paid?</th>
                    <th>Active?</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </tr>
                <TenantRow v-for="tenant in activeTenants" :tenant="tenant" :key="tenant.id"/>
                <TenantRow 
                    v-if="displayInactiveTenants"
                    v-for="tenant in inactiveTenants" :tenant="tenant" :key="tenant.id"
                />
            </table>
            <div>
                <label for="checkbox">Show Past Tenants</label>
                <input type="checkbox" id="checkbox" v-model="displayInactiveTenants">
            </div>
        </div>
        <BillModal 
            :propertyID="property.id" 
            :toggleModal="toggleNewBillModal"
            v-if="showNewBillModal"
        >
            <h3>Add New Bill</h3>
        </BillModal>
    </div>
    
</template>

<script>
import { mapActions } from 'vuex';
import TenantRow from './TenantRow';
import BillRow from './BillRow';
import BillModal from './BillModal';

export default {
    name: 'Property',
    props: ['property', 'tenants', 'bills'],
    data() {
        return {
            rentAmount: this.property.amount,
            splitBillsAmount: 0,
            showNewBillModal: false,
            displayInactiveTenants: false,
        }
    },
    components: {
        TenantRow,
        BillRow,
        BillModal,
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
            const splitAmount = this.billTotal / this.numberOfTenants;
            const payload = {
                propertyID: this.property.id,
                splitAmount: splitAmount,
            }

            if (splitAmount) {
                this.setTenantBillsForProperty(payload);
                this.splitBillsAmount = parseFloat(splitAmount.toFixed(2));
            };
        },
        totalDueThisMonth() {
            return (this.property.amount + this.splitBillsAmount).toFixed(2);
        },
        toggleNewBillModal() {
            this.showNewBillModal = !this.showNewBillModal;
        },
        mailerInfo() {
            return {
                tenants: this.tenants,
                totalDue: this.totalDueThisMonth(),
                bills: this.sharedBills,
            }
        },
    },
    mounted() {
        this.divideBillsAmongTenants();
    },
    computed: {
        activeTenants() {
            return this.tenants.filter(tenant => tenant.active);
        },
        inactiveTenants() {
            return this.tenants.filter(tenant => !tenant.active);
        },
        sharedBills() {
            return this.bills.filter(bill => bill.shared);
        },
        billTotal() {
            return this.sharedBills.reduce((sum, bill) => sum += bill.amount, 0);
        },
        numberOfTenants() {
            return this.activeTenants.length;
        },
        currentMonth() {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const currentMonth = new Date().getMonth();
            return months[currentMonth].toUpperCase();
        },
    },
    watch: {
        billTotal: function() {
            this.divideBillsAmongTenants();
        },
        numberOfTenants: function() {
            this.divideBillsAmongTenants();
        },
    },
}
</script>

<style lang="scss">
    .property {
        background: rgba(60, 92, 60, 0.5);
        width: 75vw;
        height: auto;
        margin: auto;
        margin-bottom: 40px;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;

        table, th, tr {
            border: 1px solid black;
            border-collapse: collapse;
            margin-bottom: 20px;

            .table-header th {
                font-weight: bold;
            }
        }

        .property-actions, .property-info, .property-tenants, .property-bills {
            width: 48%;
            background: rgb(240, 255, 240);;
            margin: 7px;
            display: flex;
            flex-flow: column wrap;
            align-items: center;
            justify-content: flex-start;
        }

        .property-actions {
            display: flex;
            flex-flow: column wrap;

            button, input {
                margin-bottom: 10px;
                text-align: center;
            }

            input {
                margin-top: 30px;
            }
        }

        .danger {
            background: red;
        }
    }
</style>


