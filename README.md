![Snowfall Demo](./assets/snowfall-demo-banner.gif)

# React Snowfall

[![npm](https://img.shields.io/npm/v/react-snowfall.svg)](https://www.npmjs.com/package/react-snowfall)
[![GitHub stars](https://img.shields.io/github/stars/cahilfoley/react-snowfall.svg)](https://github.com/cahilfoley/react-snowfall/stargazers)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

A react component that creates a snowfall effect

- [Live Example](https://cahilfoley.github.io/react-snowfall)
- [Demo Playground](https://codesandbox.io/s/github/cahilfoley/react-snowfall/tree/master/demo)

## Installation

With npm

```
npm i react-snowfall
```

Or with yarn

```
yarn add react-snowfall
```

## Usage

Basic usage requires no properties - it will grow to fill the nearest relative positioned parent element.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import Snowfall from 'react-snowfall'

ReactDOM.render(
  <div style={{ height: 400, width: 400, background: '#282c34', position: 'relative' }}>
    <Snowfall />
  </div>,
  document.querySelector('#app'),
)
```

## Configuration

An optional `color`, `style`, and `snowflakeCount` property can be passed in to the component.

```jsx
<Snowfall
  // Changes the snowflake color
  color="red"
  // Applied to the canvas element
  style={{ background: '#fff' }}
  // Controls the number of snowflakes that are created (default 150)
  snowflakeCount={200}
/>
```

## Using Images

Instead of rendering colored circles you can instead pass in an array of image elements
that will be randomly selected and used as the snowflake instead.

> _NOTE_: If the images provided are not square they will be stretched into a 1:1 aspect ratio.

```tsx
const snowflake1 = document.createElement('img')
snowflake1.src = '/assets/snowflake-1.png'
const snowflake2 = document.createElement('img')
snowflake2.src = '/assets/snowflake-2.jpg'

const images = [snowflake1, snowflake2]

const Demo = () => {
  return (
    <Snowfall
      // Applied to the canvas element
      style={{ background: '#fff' }}
      // Controls the number of snowflakes that are created (default 150)
      snowflakeCount={200}
      // Pass in the images to be used
      images={images}
    >
  )
}
```

## Positioning

The snowfall container is absolute positioned and has the following default styles (see [the definition](https://github.com/cahilfoley/react-snowfall/blob/a8e865e82cac3221930773cdfd6b90eeb0b34247/src/config.ts#L4-L10)):

```css
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
```

If you want the component to cover the entire screen then you can change the position to `fixed` and using `vw`/`vh` units by passing in an overriding styles object:

```jsx
<Snowfall
  style={{
    position: 'fixed',
    width: '100vw',
    height: '100vh',
  }}
/>
```
