import { act, renderHook } from '@testing-library/react-hooks'
import { TableProvider } from '~/context/table-context'
import useFilter from '~/hooks/table/use-filter'

describe('Use filter custom hook', () => {
  const wrapper = ({ children, initialFilters }) => (
    <TableProvider initialFilters={ initialFilters }>
      { children }
    </TableProvider>
  )

  it('should set filter by key', () => {
    const initialFilters = {
      firstName: ''
    }

    const { result } = renderHook(() => useFilter(), {
      wrapper,
      initialProps: {
        initialFilters
      }
    })

    act(() => {
      result.current.setFilterByKey('firstName')('Rostyslav')
    })

    expect(result.current.filters.firstName).toEqual('Rostyslav')
  })

  it('should clear filter by key', () => {
    const initialFilters = {
      firstName: ''
    }

    const { result } = renderHook(() => useFilter(), {
      wrapper,
      initialProps: {
        initialFilters
      }
    })

    act(() => {
      result.current.setFilterByKey('firstName')('Rostyslav')
      result.current.clearFilterByKey('firstName')
    })

    expect(result.current.filters.firstName).toEqual('')
  })

  it('should clear all filters', () => {
    const initialFilters = {
      firstName: '',
      email: ''
    }

    const { result } = renderHook(() => useFilter(), {
      wrapper,
      initialProps: {
        initialFilters
      }
    })

    act(() => {
      result.current.setFilterByKey('firstName')('Rostyslav')
      result.current.setFilterByKey('email')('rostyslav@gmail.com')
      result.current.clearFilters()
    })

    expect(result.current.filters).toEqual({ firstName: '', email: '' })
  })
})