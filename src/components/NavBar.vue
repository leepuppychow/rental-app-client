<template>
    <div class="nav-bar">
        <div class="nav-contents" v-if="!currentPageIsLogin()">
            <a @click="toggleAddPropertyModal">Add New Property</a>
            <a @click="toggleAddPropertyModal">Expenses Dashboard</a>
            <a @click="logout" class="logout">Logout</a>
            <AddPropertyModal 
                :toggleModal="toggleAddPropertyModal"
                v-if="addPropertyModalVisible"
            />
        </div>
        <div v-else>
            <h2>Welcome to Property Manager</h2>
        </div>
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
        },
        currentPageIsLogin() {
            return this.$route.name === "Login";
        },
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
        color: white;

        .nav-contents {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-around;
            
            a {
                margin-top: 18px;
            }
        }
    }
</style>


