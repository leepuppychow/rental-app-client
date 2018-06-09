<template>
    <div class="login">
        <h1>Please Login</h1>
        <input 
            type="text"
            placeholder="Enter username:"
            v-model="username"
        />
        <input 
            type="password"
            placeholder="Enter password:"
            v-model="password"
        />
        <button 
            value="Login"
            @click="loginRequest"
        />
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        loginRequest() {
            // make call to server (hash password there)
            const body = {
                username: this.username,
                password: this.password,
            }

            fetch(`http://localhost:3000/signup`, 
                { 
                    method: 'POST', 
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json'},
                })
                .then(resp => resp.json())
                .then(hash => {
                    debugger;
                })
                .catch(err => console.error(err))
        }
    }
    
    
}
</script>

<style lang="scss">
    .login {
        margin-top: 150px;
    }

</style>


