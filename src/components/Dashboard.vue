<template>
    <div class="dashboard">
        <h1>Welcome to your Dashboard</h1>
        <h3>Here are your properties:</h3>
        <a 
            class="dashboard-tab" 
            @click="setActiveTab(property.id)"
            v-for="property in properties" 
            v-html="property.name" 
            :key="property.id"
        />
        <Property 
            :property="properties[activePropertyID - 1]"
            :key="properties[activePropertyID - 1].id"
        />
    </div>
    
</template>

<script>
import Property from './Property.vue'

export default {
    name: 'Dashboard',
    components: {
        Property,
    },
    computed: {
        properties() {
            return this.$store.getters.properties;
        },
    },
    methods: {
        setActiveTab(id) {
            this.activePropertyID = id;
        },
    },
    data() {
        return {
            activePropertyID: 1,
        }
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


