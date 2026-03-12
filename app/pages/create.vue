<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import type { Database } from '~/types/database.types'

const client = useSupabaseClient<Database>()

const foodOne = ref('')
const foodTwo = ref('')
const description = ref('')
const tags = ref<string[]>([])
const tagInput = ref('')

const handleTagInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value
  
  if (value.includes(',')) {
    const parts = value.split(',')
    const tagsToAdd = parts.slice(0, -1)
    const remainingInput = parts[parts.length - 1]
    
    tagsToAdd.forEach(tag => {
      const cleanTag = tag.trim()
      if (cleanTag && !tags.value.includes(cleanTag) && tags.value.length < 5) {
        tags.value.push(cleanTag)
      }
    })
    
    tagInput.value = remainingInput
  }
}

const removeTag = (tagToRemove: string) => {
  tags.value = tags.value.filter(tag => tag !== tagToRemove)
}

const handleSubmit = async () => {
  if (!foodOne.value || !foodTwo.value || !description.value) {
    alert('Please fill out all required fields.')
    return
  }
  
  const { error } = await client
    .from('combos')
    .insert({
      food_one: foodOne.value,
      food_two: foodTwo.value,
      description: description.value,
      tags: tags.value,
      rating: 0
    })

  if (error) {
    alert(`Error creating combo: ${error.message}`)
    return
  }

  // Clear form
  foodOne.value = ''
  foodTwo.value = ''
  description.value = ''
  tags.value = []
  tagInput.value = ''

  navigateTo('/')
};
</script>

<template>
  <div class="create-page">
    <h1 class="page-title">Create a New Combo</h1>
    <form @submit.prevent="handleSubmit" class="create-form">
      <div class="form-group">
        <label for="foodOne">Food One</label>
        <input
          type="text"
          id="foodOne"
          v-model="foodOne"
          required
        />
      </div>
      <div class="form-group">
        <label for="foodTwo">Food Two</label>
        <input
          type="text"
          id="foodTwo"
          v-model="foodTwo"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="description"
          rows="4"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="tags">Tags (max 5)</label>
        <input
          type="text"
          id="tags"
          v-model="tagInput"
          @input="handleTagInput"
          placeholder="e.g. sweet, savory (press comma to add)"
          :disabled="tags.length >= 5"
        />
        <div class="tags-container" v-if="tags.length > 0">
          <div v-for="tag in tags" :key="tag" class="tag-pill">
            <span class="tag-text">{{ tag }}</span>
            <button type="button" class="remove-tag" @click="removeTag(tag)" aria-label="Remove tag">
              <X :size="14" />
            </button>
          </div>
        </div>
      </div>
      <button type="submit" class="btn submit-btn">Create Combo</button>
    </form>
  </div>
</template>

<style scoped>
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
}

.tag-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 50px;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  padding: 4px 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-height: 32px;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.tag-pill:hover {
  transform: translateY(-1px);
  border-color: #cbd5e1;
}

.tag-text {
  color: #000000;
  font-weight: 600;
  font-size: 0.9rem;
  margin-right: 14px;
}

.remove-tag {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  color: #64748b;
  border-radius: 50%;
  transition: color 0.2s, background-color 0.2s;
}

.remove-tag:hover {
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.1);
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>
