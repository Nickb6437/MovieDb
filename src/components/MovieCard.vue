<template>
  <div
    v-for="movie in data"
    :key="movie.id"
    class=""
  >
  <div 
    v-if="collection ? isFutureDate(movie.release_date) && !isMovie(movie.id) : true"
    class="">
    <router-link 
      :to="{
        name: 'movieDetails',
        params: {
          id: movie.id
        }
      }"
    >
      <div class="cardHeader">
        <h4>
          {{ movie.title }}
        </h4>
      </div>
      <div class="imgWrapper">
        <img 
          :src="`${imgUrl}${movie.poster_path}`" 
          :alt="movie.title"
          class="cardImg"
        >
        <div class="cardBio">
          <p class="text">
            <span>
              Release Date | {{ movie.release_date }}
            </span>
            {{ movie.overview.slice(0, 250) + "..." }}
            <span class="readMore">
              Read more
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512 512"
              >
                <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/>
              </svg>
            </span>
          </p>
        </div>
      </div>
      <div class="cardFooter">
        <h5>
          Popularity rating | {{ Math.round(movie.popularity) }}
        </h5>
      </div>
    </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    collection: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isFutureDate(dateString) {
      const date = new Date(dateString);
      const today = new Date();
      return date.getTime() <= today.getTime();
    },
    isMovie(id) {
      return this.$route.fullPath.includes(id.toString());
    }
  }
}
</script>

<style scoped>
svg {
  fill: var(--secondary);
  height: 1rem;
  width: auto;
}
.imgWrapper {
  background: var(--secondary);
  position: relative;
  aspect-ratio: 9/13.5;
  overflow: hidden;
}
.cardImg {
  position: absolute;
  inset: 0;
  object-fit: contain;
  width: 100%;
  height: auto;
}
.cardBio{
  position: absolute; 
  inset: auto 0 0 0;
  height: 0;
  opacity: 0;
  background: black;
  transition: .3s ease;
  display: flex;
  align-items: end;
  padding: 0.5rem;
  color: var(--textLight);
}
.cardBio > .text > span {
  display: block;
   margin: 0 0 .5rem;
}
.cardBio > .text > span.readMore {
  color: var(--secondary);
  text-align: right;
  display: block;
  margin: 0.5rem 0 0 0;
}
.cardHeader {
  background: var(--tertiary);
  padding: 0 1rem;
  min-height: 80px;
  display: flex;
  align-items: center;
  border-radius: 4px 4px 0 0;
}
.cardFooter {
  background: var(--tertiary);
  color:lightgrey;
  padding: 0 1rem;
  min-height: 40px;
  display: flex;
  align-items: center;
  border-radius: 0 0 4px 4px;
  justify-content: center;
}
.imgWrapper:hover > .cardBio {
  opacity: 1;
  top: 0;
  height: 100%;
}
</style>
