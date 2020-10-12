<template>
    <div class="columns">
		<div class="columns is-6">
	    	<form @submit.prevent="login" class="box">
				<div v-if="error" class="notification is-danger">
			    	{{ error }}
				</div>

				<div class="field">
			    	<label>Correo</label>
			    	<input class="input" required type="email" placeholder="Ingrese su correo" v-model="email">
				</div>

				<div class="field">
			    	<label>Contraseña</label>
		    		<input class="input" required type="password" placeholder="Ingrese su contraseña" v-model="password">
				</div>
				
				<div class="field">
		    		<button class="button is-primary is-rounded is-medim" type="submit">Ingresar</button>
				</div>
		    </form>
		</div>
    </div>
</template>

<script>
    export default {
		name: 'login'
		, data() {
			return {
				email: 'eduardo@kodoti.com'
				, password: '123456'
				, error: null
		    }
		}
		, components: {}
		, methods: {
	    	login() {
				this.$services.authService.login({
				    email: this.email
				    , password: this.password
				}).then(response => {
					if (!response.data.isSuccess) {
						this.error = response.data.message;
				    } else {
						this.$services.authService.prepare(response.data.access_token);
						this.$parent.step = "catalog";
						this.$parent.userId = response.data.result.id;
				    }
				});
	    	}
		}
    }
</script>

