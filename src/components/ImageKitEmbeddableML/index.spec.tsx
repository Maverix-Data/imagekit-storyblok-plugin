import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { setupFieldPlugin } from '@storyblok/field-plugin/test'
import FieldPlugin from '.'

vi.mock('imagekit-media-library-widget', () => ({
  ImagekitMediaLibraryWidget: vi.fn().mockImplementation(() => ({
    open: vi.fn(),
    destroy: vi.fn(),
  })),
}))

describe('ImageKitEmbeddableML', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders nothing before plugin is loaded', () => {
    // Do not call setupFieldPlugin — plugin stays in initialising state
    const { container } = render(<FieldPlugin />)
    expect(container.firstChild).toBeNull()
  })

  test('renders the Open modal button once loaded', async () => {
    const { cleanUp } = setupFieldPlugin()
    render(<FieldPlugin />)
    expect(await screen.findByRole('button', { name: /open modal/i })).toBeInTheDocument()
    cleanUp()
  })

  test('button label toggles between Open and Close as modal opens and closes', async () => {
    const { cleanUp } = setupFieldPlugin()
    const user = userEvent.setup()
    render(<FieldPlugin />)

    const button = await screen.findByRole('button', { name: /open modal/i })
    await user.click(button)
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /close modal/i })).toBeInTheDocument()
    )

    await user.click(screen.getByRole('button', { name: /close modal/i }))
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /open modal/i })).toBeInTheDocument()
    )

    cleanUp()
  })
})
