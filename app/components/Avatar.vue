<script setup lang="ts">
/**
 * Avatar.vue
 * A premium circular avatar component for FoodSmash.
 */
defineProps<{
  initial: string
  bgcolor?: 'primary' | 'secondary' | 'base'
}>()
</script>

<template>
  <div class="avatar-circle" :class="`bg-${bgcolor || 'primary'}`">
    {{ initial.charAt(0).toUpperCase() }}
  </div>
</template>

<style scoped>
.avatar-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.25rem;
  color: #fff;
  transition: all 0.3s ease;
  user-select: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.avatar-circle:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.bg-primary {
  background-color: var(--primary-accent-color);
}

.bg-secondary {
  background-color: var(--secondary-accent-color);
  color: var(--background-color) !important;
}

.bg-base {
  background-color: var(--component-bg-color);
}
</style>
