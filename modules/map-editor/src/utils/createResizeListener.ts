import { debounce } from 'lodash'
import Phaser from 'phaser'

export const createResizeListener = (
  scale: Phaser.Scale.ScaleManager
) =>
  debounce(() => {
    const parentSize = scale.parentSize
    // Honestly not sure why this particular padding is needed
    scale.resize(parentSize.width - 3, parentSize.height - 7)
  }, 400)
