import { renderWithProviders } from '~tests/test-utils'
import { fireEvent, screen } from '@testing-library/react'
import EnrollOffer from '~/containers/offer-details/enroll-offer/EnrollOffer'
import { mockOffer } from '~tests/unit/pages/offer-details/OfferDetails.spec.constants'

const mockFetchData = vi.fn()

describe('EnrollOffer', () => {
  beforeEach(() => {
    vi.mock('~/services/cooperation-service', () => ({
      cooperationService: {
        createCooperation: () => mockFetchData()
      }
    }))
    renderWithProviders(<EnrollOffer enrollOffer={vi.fn()} offer={mockOffer} />)
  })

  it('should display EnrollOffer form', () => {
    const title = screen.getByText('offerDetailsPage.enrollOffer.title')
    expect(title).toBeInTheDocument()
  })
  it('should change proficiencyLevel', () => {
    const newLevel = 'Intermediate'
    const levelSelect = screen.getAllByTestId('app-select')[0]

    fireEvent.change(levelSelect, {
      target: { value: newLevel }
    })

    expect(levelSelect.value).toBe(newLevel)
  })

  it('should send form', () => {
    const button = screen.getByText('button.createCooperation')
    fireEvent.click(button)

    expect(mockFetchData).toBeCalledTimes(1)
  })
})
