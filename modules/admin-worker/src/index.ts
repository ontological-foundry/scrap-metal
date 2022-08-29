import { Hono } from 'hono'

const app = new Hono()

app.get('/hello', c => c.json({ message: 'Hi' }))

export default app
