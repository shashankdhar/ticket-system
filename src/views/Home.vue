<template>
  <div class="home">
    <SignInForm />
  </div>
</template>

<script>
// @ is an alias to /src
import SignInForm from '@/views/SignInForm.vue'

export default {
  name: 'home',
  components: {
    SignInForm
  }
}
</script>
