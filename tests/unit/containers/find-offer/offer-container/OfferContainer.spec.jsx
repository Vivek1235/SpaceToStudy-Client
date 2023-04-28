import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'
import useBreakpoints from '~/hooks/use-breakpoints'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('~/hooks/use-breakpoints')

const mockOffer = {
  _id: 'id',
  authorAvgRating: 4.3,
  authorFirstName: 'James',
  authorLastName: 'Wilson',
  description:
    'Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which.',
  languages: ['Ukrainian', 'English'],
  author: {
    totalReviews: {
      student: 0,
      tutor: 0
    },
    photo:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    professionalSummary:
      'Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology'
  },
  price: 100,
  isBookmarked: false,
  subject: {
    id: '12345',
    name: 'English'
  },
  proficiencyLevel: ['Beginner', 'Advanced']
}

const cardsViewEnums = {
  grid: 'grid',
  inline: 'inline'
}

const mockOffers = new Array(6).fill(mockOffer)

describe('OfferContainer test on modile', () => {
  const mobileData = { isDesktop: false, isMobile: true, isTablet: false }

  it('Test should render square card component on modile', () => {
    useBreakpoints.mockImplementation(() => mobileData)
    renderWithProviders(
      <OfferContainer
        offerCards={mockOffers}
        viewMode={cardsViewEnums.inline}
      />
    )
    const starIcon = screen.getAllByTestId('star-icon')

    expect(starIcon).toHaveLength(6)
  })
})

describe('OfferContainer test on tablet', () => {
  const mobileData = { isDesktop: false, isMobile: false, isTablet: true }

  it('Test should render rectangular card on tablet', () => {
    useBreakpoints.mockImplementation(() => mobileData)
    renderWithProviders(
      <OfferContainer offerCards={mockOffers} viewMode={cardsViewEnums.grid} />
    )
    const ratingIcon = screen.getAllByTestId('app-rating')

    expect(ratingIcon).toHaveLength(6)
  })
})

describe('OfferContainer test on desktop', () => {
  const mobileData = { isDesktop: true, isMobile: false, isTablet: false }

  it('Test should render rectangular card on desktop with grid viewMode', () => {
    useBreakpoints.mockImplementation(() => mobileData)
    renderWithProviders(
      <OfferContainer offerCards={mockOffers} viewMode={cardsViewEnums.grid} />
    )

    const starIcon = screen.getAllByTestId('star-icon')

    expect(starIcon).toHaveLength(6)
  })

  it('Test should render rectangular card on desktop with inline viewMode', () => {
    useBreakpoints.mockImplementation(() => mobileData)
    renderWithProviders(
      <OfferContainer
        offerCards={mockOffers}
        viewMode={cardsViewEnums.inline}
      />
    )

    const ratingIcon = screen.getAllByTestId('app-rating')

    expect(ratingIcon).toHaveLength(6)
  })
})