<script setup lang="ts">
/**
 * preview.vue
 * Component Showcase Page for FoodSmash
 */
</script>

<template>
  <div class="preview-page">
    <h1 class="page-title">Component Preview</h1>
    
    <section class="preview-section">
      <h2 class="section-title">Avatar Component</h2>
      <div class="preview-grid">
        <div class="preview-item">
          <p>Default (Primary)</p>
          <Avatar initial="G" />
        </div>
        
        <div class="preview-item">
          <p>Secondary Color</p>
          <Avatar initial="S" bgcolor="secondary" />
        </div>
        
        <div class="preview-item">
          <p>Base Color</p>
          <Avatar initial="B" bgcolor="base" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.preview-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.preview-section {
  margin-bottom: 4rem;
  background-color: rgba(var(--component-bg-color-rgb), 0.3);
  padding: 2rem;
  border-radius: 12px;
}

.preview-grid {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.preview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.preview-item p {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Lora', serif;
}
</style>
