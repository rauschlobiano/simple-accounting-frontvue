<template>
 <div>
	 <div class="container">
		 <div class="row">
			 <div class="col-md-4">
				 
			 </div>
			 <div class="col-md-4 text-center">
				<form @submit.prevent="login">
					<img class="mb-4" src="../assets/basicmath.jpg" alt="" width="72" height="72">
					<h1 class="h3 mb-4 font-weight-light">Login</h1>				
					<input required v-model="email" type="email" class="form-control mb-4" placeholder="Email" autofocus="">				
					<input required v-model="password" type="password" class="form-control mb-4" placeholder="Password">				
					<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
					<div v-if="wrong" class="text-danger mt-2">{{errormsg}}</div>
				</form>
			</div>		 
			 <div class="col-md-4">

			 </div>
		 </div>
		
	 </div>   
 </div>
</template>
<script>
	export default {
		data(){
			return {
				email : "",
				password : "",
				wrong: false,
				errormsg: "",
            }
		},
		methods: {
		 	login: function () {
		   		let email = this.email 
		   		let password = this.password
		   		this.$store.dispatch('login', { email, password })
		   		.then(() => this.$router.push('/dashboard'))
		   		.catch(err => { 
					   this.wrong = true;
					   this.errormsg = "Sorry, wrong credentials entered";
					   console.log(err)
					   })
		   	}
		}
	}
</script>