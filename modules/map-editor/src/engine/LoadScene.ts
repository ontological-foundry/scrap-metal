import { debounce } from 'lodash'
import Phaser from 'phaser'

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
