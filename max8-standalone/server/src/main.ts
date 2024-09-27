/** @jsx jsx */
/** @jsxImportSource hono/jsx */

import Max from "max-api";
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static'
import routes from './ui';
import { Hono } from 'hono';
import tailwind from './tailwind';

const tw = tailwind.watch('./styles.css', '../public/styles.css', () => {
  Max.outlet(['reload']);
});

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
});

// アプリケーション終了時にTailwindプロセスも終了させる
process.on('SIGINT', () => {
  console.log('Stopping Tailwind watch process...');
  tw.kill();
  process.exit();
});
