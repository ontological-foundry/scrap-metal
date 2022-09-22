export enum GraphicsKey {
  Plains = 'Plains',
  Forest = 'Forest',
}

type GraphicsDataType = {
  [index in GraphicsKey]: {
    path: string
    key: string
    animKey: string
    width?: number
  }
}

export const TerrainGraphicsData: GraphicsDataType = {
  [GraphicsKey.Plains]: {
    path: 'terrain/plains.png',
    key: 'Plains',
    animKey: 'BG_Plains',
  },
  [GraphicsKey.Forest]: {
    path: 'terrain/forest.png',
    key: 'Forest',
    animKey: 'BG_Forest',
  },
}
