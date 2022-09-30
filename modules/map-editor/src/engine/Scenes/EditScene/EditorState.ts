export enum EditorState {
  Default,
  Scrolling,
}

export interface GlobalStateType {
  CurrentState: EditorState
}

export const DefaultEditorState: GlobalStateType = {
  CurrentState: EditorState.Default,
}
