import { proxy } from 'valtio'

interface GlobalState {
  user?: any
}

export const GlobalState = proxy<GlobalState>({})
