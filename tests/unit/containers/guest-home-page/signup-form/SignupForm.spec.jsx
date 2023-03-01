import { screen, fireEvent, waitFor } from '@testing-library/react'
import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'

const errors = { firstName: false, lastName: false, email: false, password: false, confirmPassword: false }
const data = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'email@mail.com',
  password: 'passTest1',
  confirmPassword: 'passTest1'
}
const handleChange = vi.fn()
const handleBlur = vi.fn()
const handleSubmit = vi.fn()
const closeModal = vi.fn()

describe('Signup form test', () => {
  const preloadedState = { appMain: { loading: false } }
  beforeEach(() => {
    renderWithProviders(
      <SignupForm
        closeModal={closeModal}
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />,
      { preloadedState }
    )
  })

  it('should render firstName input', () => {
    const input = screen.getByText('common.labels.firstName')

    expect(input).toBeInTheDocument()
  })

  it('should render lastName input', () => {
    const input = screen.getByText('common.labels.lastName')

    expect(input).toBeInTheDocument()
  })

  it('should render email input', () => {
    const input = screen.getByText('common.labels.email')

    expect(input).toBeInTheDocument()
  })

  it('should render password input', () => {
    const input = screen.getByText('common.labels.password')

    expect(input).toBeInTheDocument()
  })

  it('should render confirmPassword input', () => {
    const input = screen.getByText('common.labels.confirmPassword')

    expect(input).toBeInTheDocument()
  })

  it('should render checkbox label', () => {
    const label = screen.getByText('signup.iAgree')

    expect(label).toBeInTheDocument()
  })

  it('should render signup button', () => {
    const button = screen.getByText('common.labels.signup')

    expect(button).toBeInTheDocument()
  })

  it('should enable signup button', async () => {
    const checkbox = screen.getByRole('checkbox')
    const button = screen.getByText('common.labels.signup')

    expect(button).toBeDisabled()

    fireEvent.click(checkbox)

    expect(button).toBeEnabled()
  })

  it('should show visibility icon', async () => {
    const visibilityOffIcons = screen.getAllByTestId('VisibilityOffIcon')
    fireEvent.click(visibilityOffIcons[0])
    fireEvent.click(visibilityOffIcons[1])
    const visibilityIcons = screen.getAllByTestId('VisibilityIcon')

    await waitFor(() => {
      expect(visibilityIcons[0]).toBeInTheDocument()
      expect(visibilityOffIcons[0]).not.toBeInTheDocument()
      expect(visibilityIcons[1]).toBeInTheDocument()
      expect(visibilityOffIcons[1]).not.toBeInTheDocument()
    })
  })

  it('should close signup modal page after click', async () => {
    const link = screen.getByText('common.labels.privacyPolicy')
    fireEvent.click(link)

    await waitFor(() => expect(closeModal).toHaveBeenCalled())
  })

  it('should submit form', async () => {
    handleSubmit.mockImplementation((event) => {
      event.preventDefault()
    })
    const checkbox = screen.getByRole('checkbox')
    const button = screen.getByText('common.labels.signup')
    fireEvent.click(checkbox)
    fireEvent.click(button)

    expect(handleSubmit).toHaveBeenCalled()
  })
})

describe('Signup form test with loading', () => {
  const preloadedState = { appMain: { loading: true } }
  it('should render loader', () => {
    renderWithProviders(
      <SignupForm
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />,
      { preloadedState }
    )

    const loader = screen.getByTestId('loader')

    expect(loader).toBeInTheDocument()
  })
})