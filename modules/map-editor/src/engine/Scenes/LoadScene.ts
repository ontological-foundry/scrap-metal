import { TileSize } from '@scrapmetal/common/engine/GraphicsData/General'
import { TerrainGraphicsData } from '@scrapmetal/common/engine/GraphicsData/Terrain'
import Phaser from 'phaser'

export const LoadSceneKey = 'Loading Scene'

interface LoadSceneData {
  nextSceneKey: string
}

export class LoadScene extends Phaser.Scene {
  public async preload() {
    this.load.setBaseURL('https://edge.assets.projectscrapmetal.com/')

    this.loadSpriteSheets()
    this.load.image('cursor', 'cursor.png')
  }

  private loadSpriteSheets() {
    for (const data of Object.values(TerrainGraphicsData)) {
      this.load.spritesheet({
        key: data.key,
        url: data.path,
        frameConfig: {
          frameWidth: data.width ?? TileSize,
        },
      })
    }
  }

  public create(sceneData: LoadSceneData) {
    this.loadTerrainAnimations()

    this.scene.start(sceneData.nextSceneKey)
  }

  private loadTerrainAnimations() {
    for (const data of Object.values(TerrainGraphicsData)) {
      this.anims.create({
        key: data.animKey,
        frames: data.key,
        frameRate: 2,

        // Repeat Forever
        repeat: -1,
      })
    }
  }
}
