/** @jest-environment jsdom */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Snowfall from './Snowfall'
import { snowfallBaseStyle } from './config'
import { useSnowflakes } from './hooks'

jest.mock('./hooks')

it('renders without crashing', () => {
  render(<Snowfall />)

  expect(screen.getByTestId('SnowfallCanvas')).toBeInTheDocument()
})

describe('Styles', () => {
  it('applies the default styles if none are provided', () => {
    render(<Snowfall />)

    expect(screen.getByTestId('SnowfallCanvas')).toHaveStyle(snowfallBaseStyle as Record<string, unknown>)
  })

  it('overrides the default style properties with any provided styles', () => {
    const providedStyles = { top: '10px', left: '10px', zIndex: -1 }

    render(<Snowfall style={providedStyles} />)

    expect(screen.getByTestId('SnowfallCanvas')).toHaveStyle({
      ...snowfallBaseStyle,
      ...providedStyles,
    })
  })
})

it('renders the specified number of snowflakes', () => {
  render(<Snowfall snowflakeCount={100} />)

  expect(useSnowflakes).toHaveBeenCalledWith(expect.any(Object), 100, expect.any(Object))
})
