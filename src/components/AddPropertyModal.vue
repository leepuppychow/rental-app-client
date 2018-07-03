<template>
    <div class="modal">
        <div class='modal-header'>
            <h3>Create a New Property :)</h3>
            <p @click="toggleModal">X</p>
        </div>
       <input type="text" placeholder="Street" v-model="payload.street"/>
       <input type="text" placeholder="City" v-model="payload.city"/>
       <input type="text" placeholder="State" v-model="payload.state"/>
       <input type="text" placeholder="Zipcode" v-model="payload.zipcode"/>
       <button @click="makeNewProperty()">
           Submit
       </button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'AddPropertyModal',
    props: ['toggleModal'],
    data() {
        return {
            payload: {
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
        makeNewProperty() {
            this.createNewProperty(this.payload);
            this.toggleModal();
        },
    }
}
</script>

<style lang="scss">
    @import '../styles/modal.scss';
</style>


