import { TileSize } from '@scrapmetal/common/engine/GraphicsData/General'
import Phaser from 'phaser'
import { EditorState } from './EditorState'
import { EventTypes } from './EventTypes'

export const SetupCursorIndicator = (scene: Phaser.Scene) => {
  const cursor = scene.add.sprite(0, 0, 'cursor')

  cursor.setOrigin(2 / 68, 2 / 68)
  cursor.setDepth(1)
  cursor.setVisible(false)

  scene.events.on(EventTypes.TerrainHover, (x: number, y: number) => {
    cursor.setPosition(x * TileSize, y * TileSize)
  })

  scene.events.on(EventTypes.StateChange, (newState: EditorState) => {
    if (newState === EditorState.Default) {
      cursor.setVisible(true)
    } else {
      cursor.setVisible(false)
    }
  })
}
