<template>
    <div class="property">
        <h3>{{ property.name }}</h3>
        <h5>{{ property.street }}</h5>
        <h5>{{ property.city + ', ' + property.state }}</h5>
        <h5>Current Rental Rate: {{property.amount || 'none'}} </h5>
        <h5>Tenants:</h5>
        <p 
            v-for="tenant in tenants"
            :key="tenant.id"
        >
            {{tenant.first_name}} {{tenant.last_name}} 
        </p>
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

export default {
    name: 'Property',
    props: ['property', 'tenants'],
    methods: {
        ...mapActions([
            'deleteProperty',
            'fetchProperties',
            'setRent',
        ]),
    },
    data() {
        return {
            rentAmount: 0,
        }
    }
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


