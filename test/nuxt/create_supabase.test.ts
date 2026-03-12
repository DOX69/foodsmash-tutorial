import { describe, it, expect, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import Create from '~/pages/create.vue'

// Mock useSupabaseClient
const mockInsert = vi.fn(() => Promise.resolve({ data: null, error: null }))
const mockFrom = vi.fn(() => ({
  insert: mockInsert
}))

mockNuxtImport('useSupabaseClient', () => {
  return () => ({
    from: mockFrom
  })
})

mockNuxtImport('navigateTo', () => vi.fn())

describe('Create Page with Supabase', () => {
  it('should call supabase.insert when form is submitted', async () => {
    const component = await mountSuspended(Create)
    
    const foodOneInput = component.find('#foodOne')
    const foodTwoInput = component.find('#foodTwo')
    const descriptionInput = component.find('#description')
    
    await foodOneInput.setValue('Marmite')
    await foodTwoInput.setValue('Cheese')
    await descriptionInput.setValue('A classic savory delight.')
    
    await component.find('form').trigger('submit.prevent')
    
    // Check if .from('combos') was called
    expect(mockFrom).toHaveBeenCalledWith('combos')
    
    // Check if .insert(...) was called with correct data
    expect(mockInsert).toHaveBeenCalledWith({
      food_one: 'Marmite',
      food_two: 'Cheese',
      description: 'A classic savory delight.',
      tags: [],
      rating: 0
    })
  })
})
