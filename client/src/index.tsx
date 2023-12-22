import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import Home from './pages/Home'
import ValidationAlert from './components/ValidationAlert'
import CopySnip from './components/CopySnip'

const app = new Hono()

app.get('/', (c) => {
  return c.html(<Home />)
})

app.post('/register', async (c) => {
  const { trackingDomain } = await c.req.parseBody()
  const isValidDomain = /^([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,}$/.test(
    trackingDomain as string
  )

  if (!trackingDomain) {
    return c.html(
      <ValidationAlert text="Provide a website domain." variant="danger" />
    )
  }
  if (!isValidDomain) {
    return c.html(
      <ValidationAlert
        text="Provide a valid domain ex. mysite.com"
        variant="danger"
      />
    )
  }

  const res = await fetch('http://localhost:8000/register-site', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ trackingDomain }),
  })

  if (!res.ok) {
    return c.html(
      <ValidationAlert text="Something went wrong." variant="danger" />
    )
  }

  return c.html(
    <>
      <ValidationAlert text="Your all set!" variant="success" />
      <p class="my-2">
        Place this script tag in the head of the website pages you wish to
        track.
      </p>
      <CopySnip text='<script data-domain="mydomain.com" src="http://localhost:8000/tracking.js></script>' />
    </>
  )
})

serve(app)
