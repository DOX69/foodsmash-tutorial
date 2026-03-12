<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'

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

const handleSubmit = () => {
  if (!foodOne.value || !foodTwo.value || !description.value) {
    alert('Please fill out all required fields.')
    return
  }
  
  const comboData = {
    foodOne: foodOne.value,
    foodTwo: foodTwo.value,
    description: description.value,
    tags: tags.value,
  };

  console.log('New Combo Data:', comboData)

  // Clear form
  foodOne.value = ''
  foodTwo.value = ''
  description.value = ''
  tags.value = []
  tagInput.value = ''
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
  background: linear-gradient(to right, #ff4d4d 55%, #ffffff 45%);
  border: 2px solid #ff4d4d;
  padding: 4px 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 32px;
  transition: transform 0.2s ease;
}

.tag-pill:hover {
  transform: translateY(-1px);
}

.tag-text {
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  margin-right: 14px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.remove-tag {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  color: #ff4d4d;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.remove-tag:hover {
  background-color: rgba(255, 77, 77, 0.1);
}

input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>
