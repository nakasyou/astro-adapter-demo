import { Hono } from 'hono'
import { astroAppMiddleware } from '../dist/server/entry.mjs'

const app = new Hono()

app.use('/*', astroAppMiddleware())
app.get('/*', c => {
    return c.text('Hello Hono!')
})
Bun.serve({
    fetch: app.fetch,
    port: 3001
})