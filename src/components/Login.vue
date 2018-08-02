<template>
    <v-container>
        <v-layout row wrap>
            <v-flex px-5 md-6>
                <h2>Sign In</h2>
                <v-container class="blog-form-input mt-5">
                    <v-form>
                        <v-text-field outline v-model="signinUsername" label="Username" required></v-text-field>
                        
                        <v-text-field
                            v-model="signinPassword"
                            :append-icon="show1 ? 'visibility_off' : 'visibility'"
                            :rules="[rules.required]"
                            :type="show1 ? 'text' : 'password'"
                            label="Password"
                            hint="At least 8 characters"
                            counter
                            @click:append="show1 = !show1" >
                        </v-text-field>
                    </v-form>
                </v-container>
                <v-container>
                    <v-btn large round color="light-blue darken-1" class="white--text" v-on:click="loginUser">Sign in</v-btn>
                </v-container>
            </v-flex>

            <v-flex px-5 md-6>
                <h2>Register</h2>
                <v-container class="blog-form-input mt-5">
                    <v-form>
                        <v-text-field outline v-model="signupUsername" label="E-mail" required></v-text-field>
                        
                        <v-text-field
                            v-model="signupPassword"
                            :append-icon="show1 ? 'visibility_off' : 'visibility'"
                            :rules="[rules.required]"
                            :type="show1 ? 'text' : 'password'"
                            label="Create Password"
                            @click:append="show1 = !show1" >
                        </v-text-field>

                    </v-form>
                </v-container>
                <v-container>
                    <v-btn large round color="teal darken-1" class="white--text" v-on:click="registerUser">Sign Up</v-btn>
                </v-container>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import swal from 'sweetalert2'

export default {
    data () {
      return {
        show1: false,
        signinUsername: '',
        signinPassword: '',
        signupUsername: '',
        signupPassword: '',
        rules: {
          required: value => !!value || 'Required.'
        }
      }
    },
    created () {
        if (localStorage.hasOwnProperty('token')) {
            console.log('ada token, ga boleh masuk login form')
            this.$router.push('/')
        }
    },
    methods: {
        ...mapActions([
            'registerAccount',
            'loginAccount'
        ]),
        registerUser: function () {
            if ( this.signupUsername === '' || this.signupPassword === '') {

                swal('Ooops ..', 'No empty field bruh!', 'error')
                
                this.signupUsername = ''
                this.signupPassword = ''
                
            } else if (this.signupPassword.length < 8) {

                swal('Ooops ..', 'Password minimum 8 character!', 'error')
                
                this.signupUsername = ''
                this.signupPassword = ''

            } else {
                let payload = {
                    username: this.signupUsername,
                    password: this.signupPassword
                }


                this.signupUsername = ''
                this.signupPassword = ''

                this.$router.push('/')

                this.registerAccount(payload)
            }
        },
        loginUser: function () {
            if (this.signinUsername === '' || this.signinPassword === '') {
                swal('Ooops ..', 'No empty fielf bruh!', 'error')

                this.signinUsername = ''
                this.signinPassword = ''

            } else {
                let payload = {
                    username: this.signinUsername,
                    password: this.signinPassword
                }

                this.signinUsername = ''
                this.signinPassword = ''

                this.loginAccount(payload)

                this.$router.push('/')
            }
        }
    }
}
</script>

<style>
.blog-form-input {
    border: 1px solid black;
    border-radius: 5px;
    height: 250px;
}
</style>
