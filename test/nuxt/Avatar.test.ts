import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Avatar from '../../app/components/Avatar.vue'

describe('Avatar', () => {
  it('renders the initial', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: {
        initial: 'G'
      }
    })
    expect(wrapper.text()).toBe('G')
  })

  it('has avatar-circle class', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: {
        initial: 'G'
      }
    })
    expect(wrapper.classes()).toContain('avatar-circle')
  })

  it('defaults to primary background color', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: {
        initial: 'G'
      }
    })
    expect(wrapper.classes()).toContain('bg-primary')
  })

  it('applies secondary background color when specified', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: {
        initial: 'G',
        bgcolor: 'secondary'
      }
    })
    expect(wrapper.classes()).toContain('bg-secondary')
  })

  it('applies base background color when specified', async () => {
    const wrapper = await mountSuspended(Avatar, {
      props: {
        initial: 'G',
        bgcolor: 'base'
      }
    })
    expect(wrapper.classes()).toContain('bg-base')
  })
})
