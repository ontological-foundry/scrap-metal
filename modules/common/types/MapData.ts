import { TileKey } from '../engine/GraphicsData/TileData'

export interface MapData {
  name: string
  content: {
    size: {
      width: number
      height: number
    }
    terrain: TileKey[][]
  }
  published?: boolean
}
