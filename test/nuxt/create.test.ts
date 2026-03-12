import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

// component imports
import Create from '../../app/pages/create.vue'

describe('CreatePage', () => {
  it('should submit the form with the correct values', async () => {
    const wrapper = await mountSuspended(Create)
    const consoleSpy = vi.spyOn(console, 'log')

    await wrapper.find('#foodOne').setValue('Marmite')
    await wrapper.find('#foodTwo').setValue('Cheese')
    await wrapper.find('#description').setValue('A classic savory delight.')
    
    // Add tags one by one with comma
    const tagInput = wrapper.find('#tags')
    await tagInput.setValue('savory,')
    await tagInput.setValue('classic,')

    await wrapper.find('form').trigger('submit.prevent')

    expect(consoleSpy).toHaveBeenCalledWith('New Combo Data:', {
      foodOne: 'Marmite',
      foodTwo: 'Cheese',
      description: 'A classic savory delight.',
      tags: ['savory', 'classic'],
    })
  })

  it('should show tag pills and allow deleting them', async () => {
    const wrapper = await mountSuspended(Create)
    const tagInput = wrapper.find('#tags')

    await tagInput.setValue('spicy,')
    await tagInput.setValue('tangy,')

    const pills = wrapper.findAll('.tag-pill')
    expect(pills).toHaveLength(2)
    expect(pills[0].text()).toContain('spicy')
    expect(pills[1].text()).toContain('tangy')

    // Delete the first tag
    await pills[0].find('.remove-tag').trigger('click')
    
    const updatedPills = wrapper.findAll('.tag-pill')
    expect(updatedPills).toHaveLength(1)
    expect(updatedPills[0].text()).toContain('tangy')
  })

  it('should not allow more than 5 tags', async () => {
    const wrapper = await mountSuspended(Create)
    const tagInput = wrapper.find('#tags')

    for (let i = 1; i <= 6; i++) {
      await tagInput.setValue(`tag${i},`)
    }

    const pills = wrapper.findAll('.tag-pill')
    expect(pills).toHaveLength(5)
    expect(tagInput.attributes('disabled')).toBeDefined()
  })

  it('should not allow duplicate tags', async () => {
    const wrapper = await mountSuspended(Create)
    const tagInput = wrapper.find('#tags')

    await tagInput.setValue('savory,')
    await tagInput.setValue('savory,')

    const pills = wrapper.findAll('.tag-pill')
    expect(pills).toHaveLength(1)
  })

  it('should handle pasting multiple tags separated by commas', async () => {
    const wrapper = await mountSuspended(Create)
    const tagInput = wrapper.find('#tags')

    await tagInput.setValue('sweet, salty, spicy,')

    const pills = wrapper.findAll('.tag-pill')
    expect(pills).toHaveLength(3)
    expect(pills[0].text()).toContain('sweet')
    expect(pills[1].text()).toContain('salty')
    expect(pills[2].text()).toContain('spicy')
  })
})
