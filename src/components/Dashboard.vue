<template>
    <div class="dashboard">
        <a v-for="property in properties">
            {{property.name}}
        </a>
        <div v-if="properties.length" class="properties">
            <Property 
                v-for="property in properties"
                :property="property"
                :tenants="tenantsOfProperty(property.id)"
                :bills="billsOfProperty(property.id)"
                :key="property.id"
            />
        </div>
        <div v-else-if="statusLoading" class="loading">
            <h4>Loading properties...</h4>
        </div>
        <div v-else-if="!statusLoading && !properties.length" class="no-properties">
            <h4>No properties found. Let's add some new ones!</h4>
        </div>
    </div>
    
</template>

<script>
import Property from './Property.vue';
import { mapActions } from 'vuex';

export default {
    name: 'Dashboard',
    components: {
        Property,
    },
    computed: {
        properties() {
            return this.$store.getters.properties;
        },
        bills() {
            return this.$store.getters.bills;
        }
    },  
    methods: {
        ...mapActions([
            'fetchProperties',
            'fetchTenants',
            'fetchBills',
        ]),
        showAddPropertyModal() {
            this.AddPropertyModalVisible = !this.AddPropertyModalVisible;
        },
        tenantsOfProperty(propertyID) {
            return this.$store.getters.tenants.filter(tenant => {
                return tenant.property_id === propertyID;
            });
        },
        billsOfProperty(propertyID) {
            return this.$store.getters.bills.filter(bill => {
                return bill.property_id === propertyID;
            })
        },
    },
    data() {
        return {
            statusLoading: true,
        }
    },
    created() {
        this.fetchProperties();
        this.fetchTenants();
        this.fetchBills();
        this.statusLoading = false;
    },
    beforeRouteEnter(to, from, next) {
        localStorage.getItem('token_id') ? next() : next(false);
    },
}
</script>

<style lang="scss">
    .dashboard {
        background-color: white;
        margin-top: 100px;
        .dashboard-tab {
            margin-right: 30px;
            color: blue;
        }
    }
</style>


