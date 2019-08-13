<template>
	<div class="container">
		<b-form @submit.prevent="login" v-if="show" autocomplete="off">
			<h1>Sign in</h1>
			<b-form-group id="name" label="Name:" label-for="name">
				<b-form-input
					id="name"
					v-model="name"
					type="text"
					required
					autofocus
					placeholder="Enter your name"
				></b-form-input>
			</b-form-group>
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
			<b-form-group
				id="password_confirmation"
				label="password_confirmation"
				label-for="password_confirmation"
			>
				<b-form-input
					id="password_confirmation"
					v-model="password_confirmation"
					type="password"
					required
					placeholder="Confirm your password"
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
			name: "",
			email: "",
			password: "",
			password_confirmation: ""
		};
	},
	methods: {
		async register() {
			let data = {
				name: this.name,
				email: this.email,
				password: this.password
			};
			await this.$store
				.dispatch("register", data)
				.then(() => this.router.push("/"))
				.catch(err => console.log(err));
		}
	}
};
</script>