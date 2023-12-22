import { html } from 'hono/html'

const Layout = (props: { title: string; children?: any }) => {
  return html`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${props.title}</title>
        <script src="https://unpkg.com/htmx.org@1.9.9"></script>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-zinc-900 text-zinc-300 p-10">
        ${props.children}
      </body>
    </html>`
}

export default Layout
