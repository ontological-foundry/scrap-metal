import { TerrainGraphicsData } from '@scrapmetal/common/engine/GraphicsData/Terrain'
import Phaser from 'phaser'

export const EditMapSceneKey = 'Edit Map Scene'

export class EditMapScene extends Phaser.Scene {
  create() {
    const tile = new Phaser.GameObjects.Sprite(this, 0, 0, '')

    tile.setOrigin(0, 0)
    tile.play(TerrainGraphicsData.Forest.animKey)

    this.add.existing(tile)
  }
}
