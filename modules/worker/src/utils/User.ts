import { values } from 'faunadb'
type Ref = values.Ref
type FaunaTime = values.FaunaTime

export interface User {
  ref: Ref
  data: {
    email: string
    displayName: string
    created: FaunaTime
  }
}
