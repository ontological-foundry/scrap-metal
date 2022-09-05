import { Hono } from 'hono'
import { authToken } from './middleware/authToken'
import { cors } from './middleware/cors'
import { createOfficialMap } from './routes/create-official-map'
import { getOfficialMap } from './routes/get-official-map'
import { getOfficialMaps } from './routes/get-official-maps'
import { options } from './routes/options'
import { signIn } from './routes/sign-in'

interface Bindings {
  FAUNA_ACCESS_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.options('*', options)

app.use('*', cors)

app.post('/sign-in', signIn)

app.get('/official-maps', authToken, getOfficialMaps)
app.post('/create-official-map', authToken, createOfficialMap)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.get('/official-map/:id', authToken, getOfficialMap)

export default app
