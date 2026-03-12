<script setup lang="ts">
import { BookOpen, Users, Star } from 'lucide-vue-next';
import type { Database } from '~/types/database.types'

// Default hardcoded combos
const defaultCombos = [
  {
    id: 'default-1',
    food_one: 'Marmite',
    food_two: 'Cheese',
    description: 'A classic savory delight, loved by many.',
    tags: ['Savory', 'Classic']
  },
  {
    id: 'default-2',
    food_one: 'Maltesers',
    food_two: 'Salt & Vinegar Crisps',
    description: 'An unexpected sweet and salty crunch.',
    tags: ['Sweet', 'Salty', 'Crunchy']
  },
  {
    id: 'default-3',
    food_one: 'Strawberries',
    food_two: 'Black Pepper',
    description: 'A surprising burst of sweet and spicy.',
    tags: ['Fruity', 'Spicy']
  }
]

const client = useSupabaseClient<Database>()

const { data: dbCombos } = await useAsyncData('combos', async () => {
  const { data, error } = await client
    .from('combos')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching combos:', error)
    return null
  }
  return data
})

const displayCombos = computed(() => {
  if (dbCombos.value && dbCombos.value.length > 0) {
    return dbCombos.value.map(c => ({
      id: c.id,
      title: `${c.food_one} & ${c.food_two}`,
      description: c.description,
      tags: c.tags || []
    }))
  }
  return defaultCombos.map(c => ({
    id: c.id,
    title: `${c.food_one} & ${c.food_two}`,
    description: c.description,
    tags: c.tags
  }))
})
</script>

<template>
  <div>
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">The perfect pair for your plate.</h1>
        <p class="hero-subtitle">
          Find the weirdest and most wonderful food combinations, recommended by
          our community of food lovers.
        </p>
        <div class="search-container">
          <input
            type="text"
            class="search-input"
            placeholder="e.g. marmite and cheese"
          />
          <button class="search-button">Search</button>
        </div>
      </div>
    </div>
    <section class="features-section">
      <FeatureCard
        :icon="BookOpen"
        title="Discover new flavours"
        description="Explore a world of unexpected taste sensations and find your next favorite meal."
      />
      <FeatureCard
        :icon="Users"
        title="Join the community"
        description="Connect with fellow food enthusiasts, share your own creations, and get feedback."
      />
      <FeatureCard
        :icon="Star"
        title="Rate and review"
        description="Help others by rating and reviewing combinations, and climb the leaderboard."
      />
    </section>

    <section class="recent-combos-section">
      <h2 class="section-title">Recent Combo's</h2>
      <div class="combo-grid">
        <ComboCard
          v-for="combo in displayCombos"
          :key="combo.id"
          :title="combo.title"
          :description="combo.description"
          :tags="combo.tags"
        />
      </div>
    </section>
  </div>
</template>