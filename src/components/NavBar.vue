<template>
    <div class="nav-bar">
        <a @click="toggleAddPropertyModal">Add New Property</a>
        <a @click="logout">Logout</a>
        <AddPropertyModal 
            :toggleModal="toggleAddPropertyModal"
            v-if="addPropertyModalVisible"
        />
    </div>
</template>

<script>
import AddPropertyModal from './AddPropertyModal.vue';

export default {
    components: {
        AddPropertyModal,
    },
    data() {
        return {
            addPropertyModalVisible: false,
        };
    },
    methods: {
        logout() {
            localStorage.removeItem('token_id');
            alert("You have been logged out successfully");
            this.$router.push('Login');
        },
        toggleAddPropertyModal() {
            this.addPropertyModalVisible = !this.addPropertyModalVisible;
        }
    },
}
</script>

<style lang="scss">
    .nav-bar {
        height: 60px;
        width: 100%;
        top: 0;
        position: absolute;
        background: rgba(60, 92, 60, 0.8);
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        
        a {
            color: white;
        }
    }
</style>


