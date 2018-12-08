export function random(min: number, max: number): number {
  const randomNumber = Math.random() * (max - min + 1) + min

  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    return randomNumber
  } else {
    return Math.floor(randomNumber)
  }
}

export function lerp(start: number, end: number, normal: number) {
  return (1 - normal) * start + normal * end
}
