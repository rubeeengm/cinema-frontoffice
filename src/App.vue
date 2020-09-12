<template>
    <div id="app">
	<section class="hero is-light is-bold is-fullheight">
	    <div class="hero-body">
		<div class="container">
		    <h1 class="title">Cinema FrontOffice</h1>
		    <h2 class="subtitle">Compra ti entrada aquí mismo</h2>
		    <login v-if="step === 'login'"></login>
		    <catalog v-if="step === 'catalog'"></catalog>
		</div>
	    </div>
	</section>
    </div>
</template>

<script>
    import login from './components/Login.vue'
    import catalog from './components/Catalog.vue'

    export default {
	name: 'app'
	, data() {
	    return {
		step: 'login'
	    }
	}
	, components: {
	    login
	    , catalog
	}
	, mounted() {
	    this.$services.authService.login();
	}
    }
</script>

