import { TerrainGraphicsKey } from '@scrapmetal/common/engine/GraphicsData/Terrain'
import { MapData } from '@scrapmetal/common/types/MapData'
import { cloneDeep } from 'lodash'
import Phaser from 'phaser'
import { TerrainTile } from '../../TerrainTile'
import { SetupCameraMoveHandlers } from './CameraMoveController'
import { SetupCursorIndicator } from './CursorIndicator'
import { DefaultEditorState, GlobalStateType } from './EditorState'

export const EditMapSceneKey = 'Edit Map Scene'

interface SceneData {
  map: MapData
  updateMap: () => void
}

export class EditMapScene extends Phaser.Scene {
  private map!: MapData

  private EditorState: GlobalStateType = cloneDeep(DefaultEditorState)

  private terrainTiles: TerrainTile[][] = []

  init(sceneData: SceneData) {
    this.map = cloneDeep(sceneData.map)
  }

  create() {
    this.setupTerrain()

    SetupCameraMoveHandlers(this, this.EditorState, this.map)
    SetupCursorIndicator(this)
  }

  private setupTerrain() {
    const terrainContent = this.map.content.terrain

    for (let x = 0; x < terrainContent.length; ++x) {
      this.terrainTiles[x] = []

      for (let y = 0; y < terrainContent[x].length; ++y) {
        this.terrainTiles[x][y] = new TerrainTile(
          this,
          x,
          y,
          terrainContent[x][y] as TerrainGraphicsKey,
          this.EditorState
        )
      }
    }
  }
}
