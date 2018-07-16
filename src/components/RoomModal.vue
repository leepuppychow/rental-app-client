<template>
  <div class='modal'>
    <div class='modal-header'>
      <slot></slot>
      <p class="close-modal" @click="toggleModal">X</p>
    </div>
    <input type="text" v-model="payload.name" placeholder="Room Name"/>
    <input type="number" v-model="payload.rent" placeholder="Rent"/>
    <button @click="submitRoom(payload)">Submit</button>
  </div>
  
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['room', 'property', 'toggleModal'],
  computed: {
    payload() {
      return {
        rent: this.room ? this.room.rent : 0,
        name: this.room ? this.room.name : "",
        roomID: this.room ? this.room.room_id : "",
        propertyID: this.property.id,
      }
    }
  },
  methods: {
    ...mapActions([
      'updateRoom',
    ]),
    submitRoom(payload) {
      this.updateRoom(payload);
      this.toggleModal();
    },
  }
}
</script>

<style lang="scss">
  @import '../styles/modal.scss';
</style>


