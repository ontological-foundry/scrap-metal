import { proxy } from 'valtio'

export enum ToolType {
  Plains,
  Forest,
}

interface ToolStateType {
  currentTool?: number
}

export const ToolState = proxy<ToolStateType>({})

export const resetToolState = () => {
  for (const key of Object.keys(ToolState)) {
    ToolState[key as keyof ToolStateType] = undefined
  }
}
