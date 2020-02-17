<template>
    <div>
        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light static-top shadow">
        <div class="container">
            <a class="navbar-brand" href="#">Welcome</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarUser" 
            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarUser">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/userinfo" class="nav-link">{{user_information.email}}
                        <span class="sr-only">(current)</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/settings" class="nav-link" >Settings</router-link> 
                </li> 
            </ul>
            </div>
        </div>
        </nav>
    <router-view/>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters({ user_information: 'user_information' }),    
    },
    mounted() {
            
    },
}
</script>