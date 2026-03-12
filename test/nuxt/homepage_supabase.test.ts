import { describe, it, expect, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import Index from '~/pages/index.vue'

// Mock useSupabaseClient
const mockCombos = [
  {
    id: '1',
    food_one: 'Marmite',
    food_two: 'Cheese',
    description: 'A classic savory delight from DB.',
    tags: ['savory', 'classic'],
    rating: 5
  }
]

mockNuxtImport('useSupabaseClient', () => {
  return () => ({
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: mockCombos, error: null })
      })
    })
  })
})

describe('Homepage with Supabase', () => {
  it('should fetch and display combos from Supabase', async () => {
    const component = await mountSuspended(Index)
    
    // Check if the mock combo from DB is rendered
    expect(component.text()).toContain('Marmite & Cheese')
    expect(component.text()).toContain('A classic savory delight from DB.')
  })
})
