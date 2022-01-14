const hooks: typeof import('../hooks') = jest.requireActual('../hooks')

export const useComponentSize = jest.fn(hooks.useComponentSize)
export const useDeepCompareEffect = jest.fn(hooks.useDeepCompareEffect)
export const useDeepMemo = jest.fn(hooks.useDeepMemo)
export const useSnowfallStyle = jest.fn(hooks.useSnowfallStyle)
export const useSnowflakes = jest.fn(hooks.useSnowflakes)
