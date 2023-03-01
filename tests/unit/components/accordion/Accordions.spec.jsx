import { render, screen, fireEvent } from '@testing-library/react'
import Accordions from '~/components/accordion/Accordions'
import { vi } from 'vitest'

const onChangeMock = vi.fn()

describe('Accordion component without expandMoreIcon test', () => {
  const props = {
    items: [
      {
        title: 'title1',
        description: 'description1'
      },
      {
        title: 'title2',
        description: 'description2'
      }
    ],
    onChange: onChangeMock,
    activeIndex: '0',
    showMoreIcon: false
  }
  beforeEach(() => {
    render(<Accordions {...props} />)
  })
  it('Test headings', () => {
    const firstTitle = screen.getByText('title1')
    const secondTitle = screen.getByText('title2')

    expect(firstTitle).toBeVisible()
    expect(secondTitle).toBeVisible()
  })
  it('Test descriptions', () => {
    const firstDescription = screen.getByText('description1')
    const secondDescription = screen.getByText('description2')

    expect(firstDescription).toBeInTheDocument()
    expect(secondDescription).toBeInTheDocument()
  })
  it('Onclick test', () => {
    const title = screen.getByText('title2')
    fireEvent.click(title)

    expect(props.onChange).toHaveBeenCalled()
  })

  it('shuld render expand more icon', () => {
    const expandMoreIcon = screen.queryAllByTestId('ExpandMoreRoundedIcon')

    expect(expandMoreIcon).toHaveLength(0)
  })
})

describe('Accordions test with expandMoreIcon', () => {
  const props = {
    items: [
      {
        title: 'title1',
        description: 'description1'
      },
      {
        title: 'title2',
        description: 'description2'
      }
    ],
    showMoreIcon: true,
    onChange: onChangeMock,
    activeIndex: '0'
  }
  beforeEach(() => {
    render(<Accordions {...props} />)
  })
  it('shuld render expand more icon', () => {
    const expandMoreIcon = screen.getAllByTestId('ExpandMoreRoundedIcon')

    expect(expandMoreIcon).toHaveLength(2)
  })
})