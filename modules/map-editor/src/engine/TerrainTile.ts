import { TileSize } from '@scrapmetal/common/engine/GraphicsData/General'
import {
  TerrainGraphicsKey,
  TerrainGraphicsData,
} from '@scrapmetal/common/engine/GraphicsData/Terrain'
import Phaser from 'phaser'

export class TerrainTile extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, key: TerrainGraphicsKey) {
    super(scene, x * TileSize, y * TileSize, '')

    this.setOrigin(0, 0)
    this.play(TerrainGraphicsData[key].animKey)

    scene.add.existing(this)
  }
}
