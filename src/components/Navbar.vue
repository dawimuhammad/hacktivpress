<template>
    <v-toolbar flat color="amber lighten-1">
        <v-toolbar-title>Hacktiv Press</v-toolbar-title>
        <v-toolbar-title class="title font-weight-light">Welcome, User!</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn class="btn-navbar" flat @click="home">Home</v-btn>
            <v-btn v-if="isLogin || loginStatus" flat @click="admin">Admin Page</v-btn>
            <v-btn v-if="!isLogin || !loginStatus" @click="login" flat>Login</v-btn>
            <v-btn v-if="isLogin || loginStatus" flat @click="logout">Logout</v-btn>
        </v-toolbar-items>
      </v-toolbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Navbar',
    data: function () {
        return {
            loginStatus: false
        }
    },
    methods: {
        home() {
            this.$router.push('/')
        },
        admin () {
            this.$router.push('/admin')
        },
        login () {
            this.$router.push('/login')
        },
        logout () {
            localStorage.removeItem('token')
        }
    },
    created: function () {
        if (localStorage.hasOwnProperty('token')) {
            this.loginStatus = true
            console.log('ada token')
        } else {
            this.loginStatus = false
            console.log('ga ada token')
        }
    },
    computed: {
        ...mapState([
            'isLogin'
        ])
    }

}
</script>

<style>

</style>
