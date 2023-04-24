import { OfferResponse } from '~/types'

export interface UserInterface {
  firstName: string
  lastName: string
  photo?: string
  averageRating: number
  totalReviews: number
}

export interface CategoryInterface {
  _id: string
  name: string
  categoryIcon: string
  totalOffers: number
  createdAt: string
  updatedAt: string
}

export interface CategoryNameInterface {
  _id: string
  name: string
}

export interface SubjectInterface {
  _id: string
  name: string
  category: string
  totalOffers: number
  createdAt: string
  updatedAt: string
}

export interface SubjectNameInterface {
  _id: string
  name: string
}

export interface ReviewInterface {
  offer: OfferResponse
  author: UserInterface
  comment: string
  rating: number
  createdAt: string
}