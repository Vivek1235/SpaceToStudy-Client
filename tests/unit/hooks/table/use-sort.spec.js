import { act, renderHook } from '@testing-library/react-hooks'
import { TableProvider } from '~/context/table-context'
import useSort from '~/hooks/table/use-sort'

describe('Use sort custom hook', () => {
  const wrapper = ({ children, initialSort }) => (<TableProvider initialSort={ initialSort }>
    { children }
  </TableProvider>)

  it('should change sort order to desc', () => {
    const initialSort = { order: 'asc', orderBy: 'email' }

    const { result } = renderHook(() => useSort(), {
      wrapper,
      initialProps: {
        initialSort
      }
    })

    act(() => result.current.onRequestSort(null, 'email'))

    expect(result.current.sort.order).toEqual('desc')
  })

  it('should change sort order to asc', () => {
    const initialSort = { order: 'desc', orderBy: 'email' }

    const { result } = renderHook(() => useSort(), {
      wrapper,
      initialProps: {
        initialSort
      }
    })

    act(() => result.current.onRequestSort(null, 'email'))

    expect(result.current.sort.order).toEqual('asc')
  })
})