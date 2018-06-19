<template>
    <div class="property">
        <h5>{{ property.name }}</h5>
        <h5>{{ property.street }}</h5>
        <h5>{{ property.city + ', ' + property.state }}</h5>
        <button @click="deleteProperty(property.id)">
            Remove Property
        </button>
    </div>
    
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Property',
    props: ['property'],
    data() {
        return {
        }
    },
    methods: {
        ...mapActions([
            'deleteProperty'
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
    }
</style>


