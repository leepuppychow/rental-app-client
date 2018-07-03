<template>
    <div class="dashboard">
        <div class="tabs">
            <a 
                class="property-tab"
                v-for="property in properties" 
                :key="property.id"
                @click="setActiveTab(property.id)" 
            >
                {{property.street}}
            </a>
        </div>
        <div v-if="properties.length" class="properties">
            <Property 
                :property="activeProperty"
                :tenants="tenantsOfProperty(activeProperty.id)"
                :bills="billsOfProperty(activeProperty.id)"
                :key="activeProperty.id"
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
    data() {
        return {
            statusLoading: true,
            activeTab: null,
        }
    },
    computed: {
        properties() {
            return this.$store.getters.properties;
        },
        bills() {
            return this.$store.getters.bills;
        },
        activeProperty() {
            return this.properties.find(property => property.id === this.activeTab) || this.properties[0];
        },
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
        setActiveTab(propertyID) {
            this.activeTab = propertyID;
        },
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

        .tabs {
            display: flex;
            flex-direction: row;
            justify-content: center;
            margin-bottom: 20px;

            .property-tab {
                margin-right: 20px;
                color: white;
                background: rgba(60, 92, 60, 0.5);
                padding: 10px;

                &:hover {
                    background: rgba(60, 92, 60, 0.8);
                }
            }
        }
        
    }
</style>


