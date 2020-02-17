<template>
<div class="container">
  <div class="jumbotron mt-4">
    <h1 class="font-weight-light">Welcome!</h1>
    <div class="float-right">
      <div v-if="isLoggedIn"> <button class="btn btn-info" @click="logout">Logout</button> </div>
      <div v-else> <button class="btn btn-primary" @click="login" >Login</button> </div>


    </div>
  </div>

</div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
  methods: {
    login() {
      this.$router.push('/login');
    },
     logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
      })
      }
  },
 
}
</script>
