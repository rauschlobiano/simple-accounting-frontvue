<template>
    <div class="container mt-4">
        <h4 class="font-weight-light">User Information</h4>
        <div class="container mt-4">
            <div class="form-group">
                <label class="form-label">Name: </label>
                <label class="form-label font-weight-bold">{{ user_information.name }}</label>
                <input type="text" class="form-control" :value="user_information.name">
            </div>
        </div>
        <p>{{ token }}</p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'UserInfo',
    computed: {
        ...mapGetters({
             user_information: 'user_information' ,
             token: 'get_token',
             }),    
    },
    mounted() {
        
    },
    data() {
        return {
            
        }
    },

}
</script>