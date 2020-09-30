<template>
    <div>
	<div class="box">
	    <div class="columns">
	        <div class="field">
	            <div class="control is-expanded">
			<div class="select is-fullwidth is-medium is-rounded">
			    <select v-model="cinemaId">
				<option disabled :value="null">Seleccione un cine</option>
				<option v-for="cinema in cinemas" :value="cinema.id" :key="cinema.id">
				    {{ cinema.name }}
				</option>
			    </select>
			</div>
		    </div>
	        </div>
	    </div>
	</div>

	<div class="box">
	    <div class="columns">
	        <div class="column">
	            <div class="field">
	                <div class="control is-expanded">
			    <div class="select is-fullwidth is-medium is-rounded">
				<select v-model="order.quantity">
				    <option disabled :value="null">Elija la cantidad de entradas</option>
				    <option value="1">Una entrada</option>
				    <option value="2">Dos entradas</option>
				    <option value="3">Tres entradas</option>
				    <option value="4">Cuatro entradas</option>
				    <option value="5">Cinco entradas</option>
				</select>
	                    </div>
	                </div>
	            </div>
	        </div>
		<div class="column has-text-right">
		    <div class="title">
			<small class="has-text-grey">TOTAL</small> {{ total | currency }}
		    </div>
		</div>
	    </div>
	</div>

	<div class="columns is-multiline">
	    <div v-for="movie in catalog" :key="movie.id" class="column is-3">
		<div class="card">
		    <div class="card-image">
		        <figure class="image is-4by3">
		            <img :src="movie.image" alt="image">
		        </figure>
		    </div>
		    <div class="card-content">
		    	<div class="title is-size-6">{{ movie.name }}</div>
			<div class="subtitle has-text-grey is-size-7">{{ movie.description }}</div>
			<div class="field">
			    <div class="control is-expanded">
				<div class="select is-fullwidth is-rounded">
				    <select v-model="order.scheduleId">
					<option selected disabled>Horarios</option>
					<option v-for="item in getSchedule(movie.id)" :key="item.id" :value="item.id">{{ item.time }}</option>
				    </select>
				</div>
			    </div>
			</div>
		    </div>
		</div>
	    </div>
	</div>
    </div>
</template>

<script>
    export default {
	name: 'catalog'
	, data() {
	    return {
		cinemas: []
		, movies: []
		, cinemaId: null
		, order: {
		    scheduleId: null
		    , quantity: null
		}
	    }
	}
	, computed: {
	    catalog() {
		if (this.cinemaId === null) return [];

		let cinema = this.cinemas.find(x => x.id == this.cinemaId);
		let ids = cinema.schedules.map(x => x.movieId);

		return this.movies.filter(x => ids.includes(x.id));
	    }
	    , total() {
		if (this.order.quantity === null) return 0;
		
		return this.cinemas.find(x => x.id == this.cinemaId).price * this.order.quantity;
	    }
	}
	, components: {}
	, methods: {
	    getSchedule(movieId) {
		let schedules = this.cinemas.find(x => x.id == this.cinemaId).schedules;
		return schedules.filter(x => x.movieId === movieId);
	    }
	}
	, mounted() {
	    this.$services.cinemaService.getAll().then((response) => {
		this.cinemas = response.data;
	    });


	    this.$services.movieService.getAll().then((response) => {
		this.movies = response.data;
	    });
	}
    }
</script>

