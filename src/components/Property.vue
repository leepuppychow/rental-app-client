<template>
    <div class="property">
        <PropertyInfo 
            :property="property"
            :totalDueThisMonth="totalDueThisMonth()"
            :splitBillsAmount="splitBillsAmount"
        />
        <PropertyActions 
            :property="property"
            :rentAmount="rentAmount"
            :mailerInfo='mailerInfo()'
            :toggleNewTenantModal="toggleNewTenantModal"
            :toggleNewBillModal="toggleNewBillModal"
        />
        <PropertyBills 
            :bills="bills"
            :property="property"
        />
        <PropertyTenants
            :property="property"
            :activeTenants="activeTenants"
            :inactiveTenants="inactiveTenants"
        />
        <TenantModal 
            :property="property" 
            :toggleModal="toggleNewTenantModal"
            v-if="showNewTenantModal"
        >
            <h3>Add New Tenant</h3>
        </TenantModal>
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
import TenantModal from './TenantModal';
import BillRow from './BillRow';
import BillModal from './BillModal';
import PropertyInfo from './PropertyInfo';
import PropertyBills from './PropertyBills';
import PropertyTenants from './PropertyTenants';
import PropertyActions from './PropertyActions';

export default {
    name: 'Property',
    props: ['property', 'tenants', 'bills'],
    data() {
        return {
            rentAmount: this.property.rent,
            splitBillsAmount: 0,
            showNewBillModal: false,
            showNewTenantModal: false,
            displayInactiveTenants: false,
        }
    },
    components: {
        TenantRow,
        TenantModal,
        BillRow,
        BillModal,
        PropertyInfo,
        PropertyBills,
        PropertyTenants,
        PropertyActions,
    },
    methods: {
        ...mapActions([
            'setTenantBillsForProperty',
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
            return (this.property.rent + this.splitBillsAmount).toFixed(2);
        },
        toggleNewBillModal() {
            this.showNewBillModal = !this.showNewBillModal;
        },
        toggleNewTenantModal() {
            this.showNewTenantModal = !this.showNewTenantModal;
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


