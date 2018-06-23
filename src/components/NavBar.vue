<template>
    <div class="nav-bar">
        <a @click="logout">Logout</a>
    </div>
    
</template>

<script>

export default {
    methods: {
        logout() {
            localStorage.removeItem('token_id');
            alert("You have been logged out successfully");
            this.$router.push('Login');
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
        background-color: aquamarine;
    }
</style>


