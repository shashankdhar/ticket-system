<template>
  <div id="app">   
    <router-view/>
  </div>
</template>

<script>
  
  import TicketDetails from '@/views/Details.vue'
  import router from '@/router'

  export default {
    name: 'App',
    mounted() {
      // initial page will always be login
      router.replace('/');
    }   
  };
</script>


<style>
  @import './assets/css/App.css';
  @import './assets/css/Details.css';
</style>