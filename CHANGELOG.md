# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.2.0](https://github.com/cahilfoley/react-snowfall/compare/v2.1.2...v2.2.0) (2024-11-22)


### Features

* **Snowflakes:** Add support using opacity for image snowflakes ([dbb6d51](https://github.com/cahilfoley/react-snowfall/commit/dbb6d51e4f44a73874f747cfb636d1bc5f2f65c7))

### [2.1.2](https://github.com/cahilfoley/react-snowfall/compare/v2.1.1...v2.1.2) (2024-11-22)


### Bug Fixes

* **Snowflake:** Update the snowflake initialization to use the correct speed and wind values for the target speed and wind values ([8db1a66](https://github.com/cahilfoley/react-snowfall/commit/8db1a662e9bd7416b9bc67f4d8f610f6f680db22))

### [2.1.1](https://github.com/cahilfoley/react-snowfall/compare/v2.1.0...v2.1.1) (2024-09-06)


### Bug Fixes

* **ESM:** Update the published library to include file extensions for proper ESM compatibility ([a5d6a8f](https://github.com/cahilfoley/react-snowfall/commit/a5d6a8f9b4b36f892d47184115d4c45d18aa0dd3)), closes [#76](https://github.com/cahilfoley/react-snowfall/issues/76) [#73](https://github.com/cahilfoley/react-snowfall/issues/73)

## [2.1.0](https://github.com/cahilfoley/react-snowfall/compare/v2.0.0...v2.1.0) (2024-02-07)


### Bug Fixes

* Add module type to package.json to properly indicate the ESM bundle ([ce6b83d](https://github.com/cahilfoley/react-snowfall/commit/ce6b83d9ca76a074d2e714d30de742752580b9b9))
* Switch from useLayoutEffect to useEffect for better SSR compatibility ([400c0e6](https://github.com/cahilfoley/react-snowfall/commit/400c0e66605bf0e622854ae2475b7022756e4575))

## [2.0.0](https://github.com/cahilfoley/react-snowfall/compare/v1.2.1...v2.0.0) (2024-01-25)


### ⚠ BREAKING CHANGES

* **Snowfall:** Lots of internals have moved around - if you are only using the `<Snowfall />` component then you shouldn't have to make any changes. If you were importing any of the library internals such as the custom hooks or some utilities then these have been reorganized and are now not exported from the root of the package - you will need to import them from the specific files.

### Features

* **Snowfall:** Abstract the snowflake rendering logic into the SnowfallCanvas class that is independent of React. ([7cccc63](https://github.com/cahilfoley/react-snowfall/commit/7cccc6358ea409a36485fcd73621ac16204311d7))

### [1.2.1](https://github.com/cahilfoley/react-snowfall/compare/v1.2.0...v1.2.1) (2022-08-25)

## [1.2.0](https://github.com/cahilfoley/react-snowfall/compare/v1.1.2...v1.2.0) (2022-08-25)


### Features

* Add support for rendering images instead of circles for snowflake contents ([d0d99e4](https://github.com/cahilfoley/react-snowfall/commit/d0d99e4a3c16cf7784c0033d8039b25f35d8ecd4))

### [1.1.2](https://github.com/cahilfoley/react-snowfall/compare/v1.1.1...v1.1.2) (2022-01-20)


### Bug Fixes

* **Types:** Remove labeled tuple elements ([30dbfa7](https://github.com/cahilfoley/react-snowfall/commit/30dbfa728df23d60775eb8645af5a93ff9b992e2)), closes [#33](https://github.com/cahilfoley/react-snowfall/issues/33)

### [1.1.1](https://github.com/cahilfoley/react-snowfall/compare/v1.1.0...v1.1.1) (2021-11-29)


### Bug Fixes

* **next:** remove unused config variable to prevent NextJS crashing on window being undefined ([e4cb1f2](https://github.com/cahilfoley/react-snowfall/commit/e4cb1f2c466c44bbe3cb286acca104c7df709e13))

## [1.1.0](https://github.com/cahilfoley/react-snowfall/compare/v1.0.2...v1.1.0) (2021-02-23)


### Features

* **SnowflakeConfig:** allow additional snowflake properties to be overridden via the Snowfall props ([5d7b3f5](https://github.com/cahilfoley/react-snowfall/commit/5d7b3f53bc64f7724c77afcaba2c1f224611bc0a))

### [1.0.2](https://github.com/cahilfoley/react-snowfall/compare/v1.0.1...v1.0.2) (2019-06-09)



### [1.0.1](https://github.com/cahilfoley/react-snowfall/compare/v1.0.0...v1.0.1) (2019-06-09)


### Bug Fixes

* **color:** read color from snowflake config ([60676a9](https://github.com/cahilfoley/react-snowfall/commit/60676a9))


### Build System

* **map:** publish source maps with build ([74f9162](https://github.com/cahilfoley/react-snowfall/commit/74f9162))
* publish src with npm package ([7c49bd2](https://github.com/cahilfoley/react-snowfall/commit/7c49bd2))



## [1.0.0](https://github.com/cahilfoley/react-snowfall/compare/v1.0.0-alpha.1...v1.0.0) (2019-06-09)


### refactor

* convert library to use hooks ([0a45f70](https://github.com/cahilfoley/react-snowfall/commit/0a45f70))


### BREAKING CHANGES

* now has a peer dependency on react and react-dom >16.8



### [0.3.0](https://github.com/cahilfoley/react-snowfall/compare/v0.2.0...v0.3.0) (2018-12-12)


### Features

* add wrapping in translate calculations ([62a16dd](https://github.com/cahilfoley/react-snowfall/commit/62a16dd))



### [0.2.0](https://github.com/cahilfoley/react-snowfall/compare/v0.1.3...v0.2.0) (2018-12-11)


### Features

* update snowflake location based on time between frames ([49c2916](https://github.com/cahilfoley/react-snowfall/commit/49c2916))



#### 0.1.3 (2018-12-09)


### Features

* **snowflake:** update speed interpolation smoothing ([816d4d7](https://github.com/cahilfoley/react-snowfall/commit/816d4d7))
* add linear interpolation to speed and random speed shuffling ([47a1cd6](https://github.com/cahilfoley/react-snowfall/commit/47a1cd6))
