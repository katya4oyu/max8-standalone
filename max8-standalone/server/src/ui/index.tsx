/** @jsx jsx */
/** @jsxImportSource hono/jsx */
import { jsx } from 'hono/jsx';
import { Hono } from 'hono';
import type { FC } from 'hono/jsx';
import { jsxRenderer } from 'hono/jsx-renderer';

const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/static/styles.css" rel="stylesheet" />
      </head>
      <body>{props.children}</body>
    </html>
  )
}

const Top: FC<{ messages: string[] }> = (props: {
  messages: string[]
}) => {
  return (
    <Layout>
      <main class="w-screen h-screen bg-base-100 flex flex-col items-center justify-center gap-8">
      <h1 class="text-6xl">Hello Max8!!</h1>
      <div class="w-full flex flex-row gap-6 justify-center items-center px-4">
        {props.messages.map((message) => {
          return <button class="btn btn-xl btn-primary font-mono">{message}</button>
        })}
      </div>
      </main>
    </Layout>
  )
}

const routes = (app: Hono) => {
  app.get('/', (c) => {
    return c.render(<Top messages={['Get Started', 'View on GitHub']} />)
  })
};

export default routes;