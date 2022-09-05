export interface MapData {
  name: string
  content: {
    size: {
      width: number
      height: number
    }
    terrain: number[]
  }
  published: boolean
}
