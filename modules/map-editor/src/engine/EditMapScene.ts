import Phaser from 'phaser'
import { createResizeListener } from '../utils/createResizeListener'

export const EditMapSceneKey = 'Edit Map Scene'

export class EditMapScene extends Phaser.Scene {
  private resizeListener = createResizeListener(this.scale)

  create() {
    this.scale.on('resize', this.resizeListener)
  }
}
