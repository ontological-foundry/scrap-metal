export enum TileKey {
  Plains = 'p',
  Forest = 'f',
}

type TileDataType = {
  [index in TileKey]: {
    path: string
    key: string
    animKey: string
    width?: number
  }
}

export const TileData: TileDataType = {
  [TileKey.Plains]: {
    path: 'terrain/plains.png',
    key: 'Plains',
    animKey: 'BG_Plains',
  },
  [TileKey.Forest]: {
    path: 'terrain/forest.png',
    key: 'Forest',
    animKey: 'BG_Forest',
  },
}
