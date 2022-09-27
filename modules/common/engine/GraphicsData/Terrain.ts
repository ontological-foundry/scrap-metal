export enum TerrainGraphicsKey {
  Plains = 0,
  Forest = 1,
}

type TerrainGraphicsDataType = {
  [index in TerrainGraphicsKey]: {
    path: string
    key: string
    animKey: string
    width?: number
  }
}

export const TerrainGraphicsData: TerrainGraphicsDataType = {
  [TerrainGraphicsKey.Plains]: {
    path: 'terrain/plains.png',
    key: 'Plains',
    animKey: 'BG_Plains',
  },
  [TerrainGraphicsKey.Forest]: {
    path: 'terrain/forest.png',
    key: 'Forest',
    animKey: 'BG_Forest',
  },
}
