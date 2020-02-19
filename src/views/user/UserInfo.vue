<template>
<div class="container">
        <div class="card card-body mt-4" style="min-height: 550px">
            <h3 class="font-weight-light mt-2">User Information</h3>
            <div class="container mt-4">               
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Name</label>               
                            <input type="text" class="form-control" :value="user.name">
                        </div> 
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Email</label>               
                            <input type="text" class="form-control" :value="user.email" disabled>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Address</label>               
                            <input type="text" class="form-control" :value="user.address" >
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Gender</label>               
                            <input type="text" class="form-control" :value="user.gender" >
                        </div>
                    </div>
                </div>

                <h3 class="font-weight-light mt-4">Company Information</h3>
                <div class="row mt-4">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Database Name</label>               
                            <input type="text" class="form-control" :value="company.db_name" disabled>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Company Name</label>               
                            <input type="text" class="form-control" :value="company.name" >
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
</div>
</template>
<script>
//import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    name: 'UserInfo',
    computed: {       
    },
    mounted() {
        this.getUserInfo();
    },
    data() {
        return {
            user: {},
            company: {},
        }
    },
    methods: {
        getUserInfo(){
            axios.get('http://localhost:8008/api/profile', {
                headers: { Authorization: 'Bearer '+ this.$store.getters.get_token}
            })
            .then(resp => { 
                this.user = resp.data.user;     
                console.log(resp);   
                this.getCompanyInfo();        
            })
            .catch(err => {        
                if(err.response.status == 401)
                {
                    this.$router.push('/login');
                }           
                console.log('Error loading User Details '+err);
            })
        },
        getCompanyInfo(){
            axios.get('http://localhost:8008/api/companyinfo/'+this.user.company_id, 
                { 
                    headers: { Authorization: 'Bearer '+ this.$store.getters.get_token},                    
                })
            .then(resp => { 
                this.company = resp.data.company;     
                console.log(resp);
            })
            .catch(err => {        
                if(err.response.status == 401)
                {
                    this.$router.push('/login');
                }           
                console.log('Error loading Company Details '+err);
            })
        }
    },
}
</script>