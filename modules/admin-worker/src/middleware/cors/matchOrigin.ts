const origins = ['https://admin.projectscrapmetal.com', 'http://localhost:4567']

export const matchOrigin = (incoming: string): boolean => {
  return origins.some(element => element === incoming)
}
