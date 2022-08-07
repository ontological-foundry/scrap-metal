const origins = ['https://projectscrapmetal.com', 'http://localhost:1234']

export const matchOrigin = (incoming: string): boolean => {
  return origins.some(element => element === incoming)
}
