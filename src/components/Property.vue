<template>
    <div class="property">
        <h3>{{ property.name }}</h3>
        <h5>{{ property.street }}</h5>
        <h5>{{ property.city + ', ' + property.state }}</h5>
        <h5>Current Rental Rate: {{property.amount || 'none'}} </h5>
        <h5>Tenants:</h5>
        <Tenant v-for="tenant in tenants" :tenant="tenant" :key="tenant.id"/>
        <input v-model="rentAmount" type="number" />
        <button @click="setRent({ propertyID: property.id, rent: rentAmount })">
            Set Rent
        </button>
        <hr/>
        <button @click="deleteProperty(property.id)">
            Remove Property
        </button>
    </div>
    
</template>

<script>
import { mapActions } from 'vuex';
import Tenant from './Tenant';

export default {
    name: 'Property',
    props: ['property', 'tenants'],
    data() {
        return {
            rentAmount: 0,
        }
    },
    components: {
        Tenant,
    },
    methods: {
        ...mapActions([
            'deleteProperty',
            'fetchProperties',
            'setRent',
        ]),
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


