<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="container">
      <h3>
        MovieDB
      </h3>
      <nav>
        <RouterLink 
          to="/" 
          class="navLink"
        >
          Home
        </RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  padding: 2rem;
  background: var(--secondary);
}
header div {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
}
.navLink {
  color: var(--textLight);
  font-weight: 600;
}
.navLink:hover {
  color: var(--tertiary)
}
</style>
