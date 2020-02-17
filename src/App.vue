<template>
  <div id="app">
     <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top shadow">
        <div class="container">
            <a class="navbar-brand" href="#">RLCOMPSERV</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" 
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Home
                        <span class="sr-only">(current)</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link" >About</router-link> 
                </li>      
                <li class="nav-item">
                    <span v-if="isLoggedIn"> <a @click="goDashboard" class="nav-link ">Dashboard</a></span>
                </li>          
                <li class="nav-item">
                    <span v-if="isLoggedIn"> <a @click="goLogout" class="nav-link ">Logout</a></span>
                </li>   
            </ul>
            </div>
        </div>
        </nav>
    <router-view/>
  </div>
</template>
<script> 

  export default {
    components: {
     
    },
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      goLogout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/')
        })
      },
      goDashboard: function () {        
          this.$router.push('/userinfo')        
      }
    },
    created: function () {
      this.$http.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(logout)
          }
          throw err;
        });
      });
    }
  }
</script>

