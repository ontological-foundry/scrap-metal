import Phaser from 'phaser'
import { createResizeListener } from '../utils/createResizeListener'

export const LoadSceneKey = 'Loading Scene'

interface LoadSceneData {
  nextSceneKey: string
}

export class LoadScene extends Phaser.Scene {
  public async preload() {
    console.log('Preload')
  }

  public create(sceneData: LoadSceneData) {
    this.scene.start(sceneData.nextSceneKey)
  }
}
