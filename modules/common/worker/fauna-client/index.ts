import { Client } from 'faunadb'

export const createClient = (key: string): Client =>
  new Client({
    secret: key,
  })
