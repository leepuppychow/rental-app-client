<template>
    <div class="login">
        <h3>
            <span v-if="!createAccount">LOGIN</span>
            <span v-else>CREATE ACCOUNT</span>
        </h3>
        <input 
            type="text"
            placeholder="Username"
            v-model="username"
            class="login-input"
        />
        <input 
            type="password"
            placeholder="Password"
            v-model="password"
            class="login-input"
        />
        <input 
            v-if="createAccount"
            type="text"
            placeholder="Email"
            class="login-input"
            v-model="email"
        />
         <input 
            v-if="createAccount"
            type="text"
            placeholder="Venmo username"
            class="login-input"
            v-model="venmo"
        />
        <button 
            v-if="!createAccount" 
            class="login-button"
            @click="loginRequest">
            Login
        </button>
        <button 
            v-if="createAccount" 
            class="login-button"
            @click="createUserRequest">
            Submit
        </button>
        <h3 @click="showCreateAccountFields">
            <a v-if="!createAccount" class="bottom-message">Or... Create New Account</a>
            <a v-else class="bottom-message">Oh wait, I just wanna login</a>
        </h3>
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
            createAccount: false,
        }
    },
    methods: {
        showCreateAccountFields() {
            this.createAccount = !this.createAccount;
        },
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
                    if (resp.status === "error") {
                        alert("Error occured. Please enter all data or username is taken.")
                        this.$router.push('Login');
                    } else {
                        localStorage.setItem('token_id', resp.token_id);
                        this.$router.push('Dashboard');
                    }
                })
                .catch(err => console.log(err))
        },

        loginRequest() {
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
                        this.$router.push('Dashboard');
                    } else {
                        alert(resp.message);
                        this.username = "";
                        this.password = "";
                        this.$router.push('Login');
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
        display: flex;
        flex-flow: column wrap;
        align-items: center;
    }
    .login-input, .login-button {
        width: 250px;
        margin: 5px;
    }
    .bottom-message {
        color: blue;
        text-decoration: underline;
    }


</style>


