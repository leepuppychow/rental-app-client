<template>
    <div class="property">
        <div class="property-info">
            <h3>PROPERTY INFO:</h3>
            <table>
                <tr>
                    <th>Address:</th>
                    <th>{{ property.street + " " + property.city + ', ' + property.state }}</th>
                </tr>
                <tr>
                    <th>Current Rental Rate:</th>
                    <th>{{property.amount || 'none'}}</th>
                </tr>
                <tr>
                    <th>Current Split Utilities:</th>
                    <th>{{splitBillsAmount || 'none'}}</th>
                </tr>
                <tr>
                    <th>TOTAL DUE ({{currentMonth}}):</th>
                    <th>{{totalDueThisMonth()}}</th>
                </tr>
            </table>
        </div>

        <div class="property-actions">
            <h3>ACTIONS:</h3>
            <button class="action-button" @click="sendBillEmail(mailerInfo())">Send Bill Email to Tenants</button>
            <button class="action-button" @click="toggleNewBillModal()">
                Add New Bill 
            </button>
            <button class="action-button" >
                Edit Property
            </button>
            <button class="action-button danger" @click="deleteProperty(property.id)">
                Remove Property
            </button>
            <input v-model="rentAmount" type="number" />
            <button class="action-button" @click="setRent({ propertyID: property.id, rent: rentAmount })">
                Set Rent
            </button>
        </div>

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

        <div class="property-tenants">
            <h3>TENANTS:</h3>
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

        h3 {
            text-decoration: underline;
        }

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
            margin: 10px;
            display: flex;
            flex-flow: column wrap;
            align-items: center;
            justify-content: flex-start;
        }

        .property-actions {
            display: flex;
            flex-flow: column wrap;

            .action-button, input {
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


