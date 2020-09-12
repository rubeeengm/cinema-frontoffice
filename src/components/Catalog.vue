<template>
    <div>
	<div class="box">
	    <div class="columns">
	        <div class="field">
	            <div class="control is-expanded">
			<div class="select is-fullwidth is-medium is-rounded">
			    <select v-model="order.cinemaId">
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

	<div class="columns is-multiline">
	    <div v-for="movie in catalog" :key="movie.id" class="column is-3">
		<div class="card">
		    <div class="card-image">
		        <figure class="image is-4by3">
		            <img :src="movie.image" alt="image">
		        </figure>
		    </div>
		</div>

		<div class="card-content">
		    <div class="title is-size-6">{{ movie.name }}</div>
		    <div class="subtitle has-text-grey is-size-7">{{ movie.description }}</div>
		    <div class="field">
		        <div class="control is-expanded">
		            <div class="select is-fullwidth is-rounded">
		                <select>
				    <option selected disabled>Horarios</option>
				</select>
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
		, order: {
		    cinemaId: null
		}
	    }
	}
	, computed: {
	    catalog() {
		if (this.order.cinemaId === null) return [];

		let cinema = this.cinemas.find(x => x.id == this.order.cinemaId);
		let ids = cinema.schedules.map(x => x.movieId);

		return this.movies.filter(x => ids.includes(x.id));
	    }
	}
	, components: {}
	, methods: {}
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

