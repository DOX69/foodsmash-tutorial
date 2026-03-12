import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ComboCard from '../../app/components/ComboCard.vue'

describe('ComboCard', () => {
  it('renders correctly with props', async () => {
    const component = await mountSuspended(ComboCard, {
      props: {
        title: 'Marmite & Cheese',
        description: 'A classic savory delight, loved by many.',
        tags: ['Savory', 'Classic']
      }
    })

    expect(component.text()).toContain('Marmite & Cheese')
    expect(component.text()).toContain('A classic savory delight, loved by many.')
    expect(component.text()).toContain('Savory')
    expect(component.text()).toContain('Classic')
    expect(component.classes()).toContain('combo-card')
  })
})
