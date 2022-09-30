import { TileSize } from '@scrapmetal/common/engine/GraphicsData/General'
import { MapData } from '@scrapmetal/common/types/MapData'
import Phaser from 'phaser'
import { EditorState, GlobalStateType } from './EditorState'
import { EventTypes } from './EventTypes'

export const SetupCameraMoveHandlers = (
  scene: Phaser.Scene,
  globalState: GlobalStateType,
  map: MapData
) => {
  scene.input.mouse.disableContextMenu()

  const mainCamera = scene.cameras.main

  scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    if (pointer.rightButtonDown()) {
      globalState.CurrentState = EditorState.Scrolling
      scene.events.emit(EventTypes.StateChange, EditorState.Scrolling)
    }
  })

  scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
    if (pointer.rightButtonReleased()) {
      globalState.CurrentState = EditorState.Default
      scene.events.emit(EventTypes.StateChange, EditorState.Default)
    }
  })

  scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
    if (globalState.CurrentState === EditorState.Scrolling) {
      mainCamera.scrollX -=
        (pointer.x - pointer.prevPosition.x) / mainCamera.zoom

      mainCamera.scrollY -=
        (pointer.y - pointer.prevPosition.y) / mainCamera.zoom
    }
  })

  const mapSize = map.content.size
  const widthScale = mainCamera.width / (mapSize.width * TileSize + 20)
  const heightScale = mainCamera.height / (mapSize.height * TileSize + 20)

  const minScale = Math.max(widthScale, heightScale)
  const minZoom = Math.max(minScale, 0.5)

  mainCamera.setBounds(
    -10,
    -10,
    TileSize * mapSize.width + 18,
    TileSize * mapSize.height + 18
  )

  scene.input.on('wheel', (pointer: Phaser.Input.Pointer) => {
    switch (globalState.CurrentState) {
      case EditorState.Default:
      case EditorState.Scrolling:
        // CLamp zoom between the calculated min and 2
        mainCamera.zoom = Math.min(
          Math.max(mainCamera.zoom - pointer.deltaY / 5000, minScale),
          2
        )
    }
  })
}
