<template>
  <div class="movieGrid">
      <MovieCard :data="data" />
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue';

export default {
  props: {
    data: Array,
  },
  components: {
    MovieCard
  }
}
</script>

<style scoped>
svg {
  fill: var(--secondary);
  height: 1rem;
  width: auto;
}
.movieGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-width: 90vw;
  margin: 0 auto;
}
.imgWrapper {
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
@media (min-width: 640px) and (max-width: 768px){
  .movieGrid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 768px) and (max-width: 1280px){
  .movieGrid {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
  }
}
@media (min-width: 1280px) and (max-width: 1600px) {
  .movieGrid {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    max-width: 80vw;
    gap: 2rem;
  }
}
@media (min-width: 1600px) {
  .movieGrid {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    max-width: 80vw;
    gap: 2rem;

  }
}
</style>
