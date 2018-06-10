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
        <button @click="loginRequest">Login</button>

        <h1>Or Create New Account</h1>
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
         <input 
            type="text"
            placeholder="Enter email:"
            v-model="email"
        />
         <input 
            type="text"
            placeholder="Enter Venmo name:"
            v-model="venmo"
        />
        <button @click="createUserRequest">Create Account</button>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            username: null,
            password: null,
            email: null,
            venmo: null,
        }
    },
    methods: {
        createUserRequest() {
            const body = {
                username: this.username,
                password: this.password,
                email: this.email,
                venmo: this.venmo,
            }

            fetch(`http://localhost:3000/users`, 
                { 
                    method: 'POST', 
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json'},
                })
                .then(resp => resp.json())
                .then(resp => {
                    localStorage.setItem('token_id', resp.token_id);
                    localStorage.setItem('access_token', resp.access_token);
                    debugger
                    // figure out how to route to dashboard (this is undefined here)
                })
                .catch(err => console.error(err))
        },

        loginRequest() {
            // make call to server (hash password there)
            const body = {
                username: this.username,
                password: this.password,
            }

            fetch(`http://localhost:3000/login`, 
                { 
                    method: 'POST', 
                    body: JSON.stringify(body),
                    headers: { 'Content-Type': 'application/json'},
                })
                .then(resp => resp.json())
                .then(resp => {
                    if (resp.status === "success") {
                        alert(resp.message);
                        localStorage.setItem('token_id', resp.token_id);
                        localStorage.setItem('access_token', resp.access_token);
                        debugger
                        // redirect to user's dashboard
                    } else {
                        alert(resp.message);
                        // redirect to login homepage
                    }
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


