/** @jsx jsx */
/** @jsxImportSource hono/jsx */

import Max from "max-api";
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static'
import routes from './components';
import { Hono } from 'hono';

const app = new Hono();

app.use('/static/*', serveStatic({ 
  root: '../public',
  rewriteRequestPath: (path) =>
    path.replace(/^\/static/, '/'),
 }))

routes(app);

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
