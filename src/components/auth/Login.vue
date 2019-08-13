<template>
	<div class="container">
		<b-form @submit.prevent="login" v-if="show" autocomplete="off">
			<h1>Sign in</h1>
			<b-form-group id="email" label="Email address:" label-for="email">
				<b-form-input id="email" v-model="email" type="email" required placeholder="Enter your email"></b-form-input>
			</b-form-group>
			<b-form-group id="password" label="Password:" label-for="password">
				<b-form-input
					id="password"
					v-model="password"
					type="password"
					required
					placeholder="Enter your password"
				></b-form-input>
			</b-form-group>
			<b-button type="submit" variant="primary">Login</b-button>
		</b-form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			email: "",
			password: ""
		};
	},
	methods: {
		async login() {
			let email = this.email;
			let password = this.password;
			await this.$store
				.dispatch("login", { email, password })
				.then(() => this.$router.push("/"))
				.catch(err => console.log(err));
		}
	}
};
</script>