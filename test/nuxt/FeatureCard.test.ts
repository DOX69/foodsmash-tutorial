import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { BookOpen } from 'lucide-vue-next'
import FeatureCard from '../../app/components/FeatureCard.vue'

describe('FeatureCard', () => {
  it('renders correctly with props', async () => {
    const component = await mountSuspended(FeatureCard, {
      props: {
        icon: BookOpen,
        title: 'Discover new flavours',
        description: 'Explore a world of unexpected taste sensations.'
      }
    })

    expect(component.text()).toContain('Discover new flavours')
    expect(component.text()).toContain('Explore a world of unexpected taste sensations.')
    expect(component.findComponent(BookOpen).exists()).toBe(true)
    expect(component.classes()).toContain('feature-card')
  })
})
