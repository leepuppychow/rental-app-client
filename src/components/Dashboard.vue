<template>
    <div class="dashboard">
        <h1>Welcome to your Dashboard</h1>
        <AddPropertyForm v-if="addPropertyFormVisible"/>
        <div v-if="properties.length" class="properties">
            <h3>Here are your properties:</h3>
            <Property 
                v-for="property in properties"
                :property="property"
                :key="property.id"
            />
        </div>
        <div v-else-if="statusLoading" class="loading">
            <h4>Loading properties...</h4>
        </div>
        <div v-else-if="!statusLoading && !properties.length" class="no-properties">
            <h4>No properties found. Let's add some new ones!</h4>
        </div>
        <button @click="showAddPropertyForm">
            Add a New Property
        </button>
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
        ]),
        showAddPropertyForm() {
            this.addPropertyFormVisible = !this.addPropertyFormVisible
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
        this.statusLoading = false;
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


