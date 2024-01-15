import { emptyField } from '~/utils/validations/common'

export const validations = {
  title: (value: string | null) =>
    emptyField(value, 'common.errorMessages.title'),
  description: (value: string) =>
    emptyField(value, 'common.errorMessages.description')
}

export const initialValues = {
  title: '',
  description: '',
  content: '',
  attachments: [],
  category: null
}

export const defaultResponse = {
  attachments: [],
  author: '',
  createdAt: '',
  description: '',
  title: '',
  updatedAt: '',
  _id: '',
  content: '',
  category: null
}

export const myResourcesPath = '/my-resources'
