<template>
  <div class="">
    <div class="container row" style="padding: 4rem 0">
      <div class="leftColumn">
          <div class="imgWrapper">
            <img
              :src="`${backdropUrl}${movie.backdrop_path}`"
              :alt="movie.title"
              class="movieBanner"
            />
        </div>
        <div class="votes">
          <span>
            Voted - {{ movie.vote_average }}
          </span>
          |
          <span>
            out of - {{ movie.vote_count }} - votes
          </span>
        </div>
        <div class="platforms">
          <div class="platformsHeader">
            <h3 class="">
              Where to Watch
            </h3>
            <select
              class=""
              v-model='country'
            >
              <option 
                selected
                disabled
                value="Pick Country">Pick Country</option>
              <option 
                v-for="(provider, index) in providers" 
                :key="index"
                :value="index">{{index}}</option>
            </select>
          </div>
          <div class="">
            <div
              v-for="(provider, index) in providers" 
              :key="index"
            >
              <div 
                v-if="country === index"
                class=""
              >
                <h4
                  v-if="provider.rent" 
                  class="">
                  Rent
                </h4>
                <div class="rent">
                  <div 
                    v-for="rent in provider.rent"
                    :key="rent.provider_id"
                    class="provider">
                    <img
                      :src="`${imgUrl}${rent.logo_path}`"
                      :alt="rent.name"
                      class="logo"
                    />
                    {{ rent.provider_name }}
                  </div>
                </div>
                <h4
                  v-if="provider.buy" 
                  class="">
                  Buy
                </h4>
                <div class="buy">
                  <div 
                    v-for="buy in provider.buy"
                    :key="buy.provider_id"
                    class="provider">
                    <img
                      :src="`${imgUrl}${buy.logo_path}`"
                      :alt="buy.name"
                      class="logo"
                    />
                    {{ buy.provider_name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rightColumn">
        <div class="movieDteails">
          <h1>
            {{ movie.title }}
          </h1>
          <h3>
            {{ movie.tagline }}
          </h3>
          <p>{{ movie.overview }}</p>
          <ul class="movieDteailsList">
            <li>Release Date - {{ movie.release_date }}</li>
            <li>Runtime - {{ movie.runtime }}</li>
            <li>
              Production Countries
              <ul>
                <li
                  v-for="(country, index) in movie.production_countries"
                  :key="index"
                >
                  {{ country.name }}
                </li>
              </ul>
            </li>
            <li>
              Production Companies
              <ul>
                <li 
                  v-for="company in movie.production_companies" 
                  :key="company.id"
                >
                  <img
                    :src="`${imgUrl}${company.logo_path}`"
                    :alt="company.name"
                    class="logo"
                  />
                  {{ company.name }}
                </li>
              </ul>
            </li>
            <li>
              Budget - {{ movie.budget ? movie.budget.toLocaleString() : null }} |
              Revenue - {{ movie.revenue ? movie.revenue.toLocaleString() : null }}
            </li>
          </ul>
          <a class="extLink" target="_blank" :href="movie.homepage">
            Visit Offical Website
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
              />
            </svg>
          </a>
        </div>
        <div          
          v-if="collection.parts"
          class="collectionContainer"
        >
          <h4 
            class="">
            Part of the collection
          </h4>
          <div class="collection">
            <MovieCard :data="collection.parts" collection="true" />
          </div>
        </div>
      </div>
    </div>
    <div 
      v-if="recommendations"
      class="container"
    >
      <h2 class="">
        Similar Movies You Might Like
      </h2>
      <MovieGrid :data="recommendations"/>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "../components/MovieCard.vue";
import MovieGrid from "../components/MovieGrid.vue";

export default {
  name: "movieDetails",
  data() {
    return {
      movie: {},
      providers: {},
      country: 'Pick Country',
      collection: {},
      recommendations: {},
      movieId: null,
    };
  },
  components: {
    MovieCard,
    MovieGrid
  },
  mounted() {
    this.movieId = this.$route.params.id;
    axios
      .get(`${this.apiUrl}movie/${this.movieId}?api_key=${this.apiKey}`)
      .then((res) => {
        console.log(res.data);
        this.movie = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${this.apiUrl}movie/${this.movieId}/watch/providers?api_key=${this.apiKey}`)
      .then((res) => {
        console.log(res.data.results);
        this.providers = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${this.apiUrl}movie/${this.movieId}/recommendations?api_key=${this.apiKey}`)
      .then((res) => {
        console.log('recommendations');
        console.log(res.data.results);
        this.recommendations = res.data.results;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {
    movie: {
      handler(newValue, oldValue) {
        if (newValue && newValue.belongs_to_collection) {
          axios
            .get(`${this.apiUrl}collection/${newValue.belongs_to_collection.id}?api_key=${this.apiKey}`)
            .then((res) => {
              console.log(res.data);
              this.collection = res.data;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
      deep: true
    },
    '$route.params.id': {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          console.log('value changes ' + newValue);
          this.$router.go();
          window.scrollTo(0, 0);
        }
      }
    }
  }
};
</script>

<style>
.collection {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}
.votes{
  background: var(--secondary);
  padding: 1rem 0.5rem;
  color: white;
  text-align: center;
  border-radius: 0 0 4px 4px ;
}
.leftColumn,
.rightColumn {
  width: 50%;
}
.rightColumn {
  margin: 0 0 0 2rem;
}
.imgWrapper {
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
}
.movieBanner {
  position: absolute;
  width: 100%;
  height: auto;
  inset: 0;
  object-fit: cover;
}
.movieDteailsList li {
  margin: 0 0 0.5rem 0;
}
.movieDteailsList li ul li:first-of-type {
  margin: 0.5rem 0 0.5rem 0;
}
.movieDteailsList li ul li {
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.logo {
  max-width: 50px;
  height: auto;
}
.platforms {
  background: var(--secondary);
  padding: 1rem;
  margin: 2rem 0;
  border-radius: 4px;
}.platformsHeader{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.platformsHeader > select{
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid gray;
  height: fit-content;
  box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, 0.7);
}
.provider,
.buy, 
.rent {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}
@media screen and (min-width: 600px) {
  .collection {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (min-width: 768px) {
  .collection {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
