<template>
    <v-toolbar flat color="amber lighten-1">
        <v-toolbar-title>Hacktiv Press</v-toolbar-title>
        <v-toolbar-title class="title font-weight-light">Welcome, User!</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn class="btn-navbar" flat>Home</v-btn>
            <v-btn v-if="userToken" flat @click="about">Admin Page</v-btn>
            <v-btn v-if="!userToken" @click="login" flat>Login</v-btn>
            <v-btn v-if="!userToken" flat @click="register">Register</v-btn>
            <v-btn v-if="userToken" flat @click="logout">Logout</v-btn>
        </v-toolbar-items>
      </v-toolbar>
</template>

<script>
export default {
    name: 'Navbar',
    data: function () {
        return {
            userToken: ''
        }
    },
    methods: {
        // home() {
        //     this.$router.push('/')
        // },
        // about () {
        //     this.$router.push('/about')
        // },
        // register () {
        //     this.$router.push('/register')
        // },
        // login () {
        //     this.$router.push('/login')
        // },
        // logout () {
        //     localStorage.removeItem('token')
        // }
    },
    created: function () {
        if (localStorage.hasOwnProperty('token')) {
            this.userToken = true
        } else {
            this.userToken = false
            console.log('ga ada token')
        }
    },
    computed: {

    }

}
</script>

<style>

</style>
