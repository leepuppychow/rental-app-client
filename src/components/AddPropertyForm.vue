<template>
    <div class="add-property-form">
       <input type="text" placeholder="Property name" v-model="payload.name"/>
       <input type="text" placeholder="Street" v-model="payload.street"/>
       <input type="text" placeholder="City" v-model="payload.city"/>
       <input type="text" placeholder="State" v-model="payload.state"/>
       <input type="text" placeholder="Zipcode" v-model="payload.zipcode"/>
       <button @click="createNewProperty(payload)">
           Submit
       </button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'AddPropertyForm',
    data() {
        return {
            payload: {
                name: "",
                street: "",
                city: "",
                state: "",
                zipcode: "",
            }
        }
    },
    methods: {
        ...mapActions([
            'createNewProperty'
        ]),
    }
}
</script>

<style lang="scss">
    .add-property-form {
        display: flex;
        flex-direction: column;
        align-items: center;

        input, button {
            width: 400px;
            margin-bottom: 10px;
        }
    }
</style>


