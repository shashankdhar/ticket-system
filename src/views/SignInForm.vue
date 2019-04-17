<template>
  <div class="wrapper">
    <div class="container">
      <h1>Welcome</h1>    
      <form ref="login-form" class="form">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button class="btn-login" v-on:click="submit">Login</button>
        <span class="error-login" v-if="authError" role="alert">
            Authentication Failed! Please check your credentials.
        </span>
      </form>
    </div>
  </div>
</template>

<script>

import Users from '@/assets/User.json'
import router from '@/router'

export default {
  name: 'SignInForm',
  data () {
    return {
      username: '',
      password: '',
      authError : false
    }
  },
  methods: {
    submit () {
      /*check for users data for the inputs user has given*/
      for (var i = Users.length - 1; i >= 0; i--) {
        if (this.username == Users[i].id && this.password == Users[i].password) {
          this.authError = false;
          router.replace('details');
          return;
        }
      }
      this.authError = true;
    }
  }
}
</script>