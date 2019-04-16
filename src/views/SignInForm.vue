<template>
  <div class="wrapper">
    <div class="container">
      <h1>Welcome</h1>    
      <form class="form">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit" id="login-button">Login</button>
      </form>
    </div>
  </div>
</template>

<script>

{/*import Users from '@/assets/User.json'*/}

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      return false;
    }
  }
}
</script>