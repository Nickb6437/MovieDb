<template>
  <main>
    <div class="container">
      <h1>Trending Movies This Week</h1>
    </div>
    <MovieGrid :data="movies"/>
  </main>
</template>

<script>
import axios from 'axios'
import MovieGrid from '../components/MovieGrid.vue'

export default {
  name: 'home',

  data() {
    return {
       movies: null
    };
  },
  components: {
    MovieGrid
  },
  mounted() {
    axios.get(`${this.apiUrl}trending/movie/week?api_key=${this.apiKey}`)
      .then(res => {
        console.log(res.data.results)
        this.movies = res.data.results
      })
      .catch(err => {
        console.log(err);
      })
  }
}
</script>
<style scoped>
main{
  padding: 6rem 0;
}
</style>