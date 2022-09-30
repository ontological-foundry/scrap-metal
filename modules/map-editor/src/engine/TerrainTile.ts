import { TileSize } from '@scrapmetal/common/engine/GraphicsData/General'
import {
  TerrainGraphicsData,
  TerrainGraphicsKey,
} from '@scrapmetal/common/engine/GraphicsData/Terrain'
import Phaser from 'phaser'
import { EditorState, GlobalStateType } from './Scenes/EditScene/EditorState'
import { EventTypes } from './Scenes/EditScene/EventTypes'

export class TerrainTile extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: TerrainGraphicsKey,
    globalState: GlobalStateType
  ) {
    super(scene, x * TileSize, y * TileSize, '')

    this.setOrigin(0, 0)
    this.play(TerrainGraphicsData[key].animKey)

    scene.add.existing(this)

    this.setInteractive()
    this.on(
      'pointerover',
      (
        pointer: Phaser.Input.Pointer,
        localX: number,
        localY: number,
        event: Phaser.Types.Input.EventData
      ) => {
        if (globalState.CurrentState === EditorState.Default) {
          event.stopPropagation()
          scene.events.emit(EventTypes.TerrainHover, x, y)
        }
      }
    )
  }
}
