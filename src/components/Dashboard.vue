<template>
    <div class="dashboard">
        <button @click="showAddPropertyForm">
            New Property?
        </button>
        <AddPropertyForm v-if="addPropertyFormVisible"/>
        <div v-if="properties.length" class="properties">
            <h3>Here are your properties:</h3>
            <Property 
                v-for="property in properties"
                :property="property"
                :tenants="tenantsOfProperty(property.id)"
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
import AddPropertyForm from './AddPropertyForm.vue';
import { mapActions } from 'vuex';

export default {
    name: 'Dashboard',
    components: {
        Property,
        AddPropertyForm,
    },
    computed: {
        properties() {
            return this.$store.getters.properties;
        },
    },  
    methods: {
        ...mapActions([
            'fetchProperties',
            'fetchTenants',
        ]),
        showAddPropertyForm() {
            this.addPropertyFormVisible = !this.addPropertyFormVisible;
        },
        tenantsOfProperty(propertyID) {
            return this.$store.getters.tenants.filter(tenant => {
                return tenant.property_id === propertyID;
            });
        },
    },
    data() {
        return {
            statusLoading: true,
            addPropertyFormVisible: false,
        }
    },
    created() {
        this.fetchProperties();
        this.fetchTenants();
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


