import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import Home from './pages/Home'
import ValidationAlert from './components/ValidationAlert'
import CopySnip from './components/CopySnip'
import { readonlyPrisma } from './db'
import DomainPage from './pages/DomainPage'
import ErrorPage from './pages/ErrorPage'

const app = new Hono()

app.get('/', async (c) => {
  try {
    const trackedWebsites = await readonlyPrisma.website.findMany()
    const trackedDomains = trackedWebsites.map((w) => w.name)
    return c.html(<Home trackedDomains={trackedDomains} />)
  } catch (error) {
    return c.html(<Home />)
  }
})

app.post('/register', async (c) => {
  const { trackingDomain } = await c.req.parseBody()

  if (!trackingDomain) {
    return c.html(
      <ValidationAlert text="Provide a website domain." variant="danger" />
    )
  }

  const alreadyTracking = await readonlyPrisma.website.findFirst({
    where: { name: trackingDomain as string },
  })

  if (alreadyTracking) {
    return c.html(
      <ValidationAlert text="Already tracking that domain." variant="danger" />
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

app.get('/domains', async (c) => {
  try {
    const { name: domainName } = c.req.query()

    if (!domainName) {
      return c.redirect('/')
    }

    const websiteEntry = await readonlyPrisma.website.findFirst({
      where: {
        name: domainName,
      },
    })

    if (!websiteEntry) {
      return c.html(
        <ErrorPage errorMsg={`Couldn't find tracking data for ${domainName}`} />
      )
    }

    const last30DaysPageViews = await readonlyPrisma.pageView.findMany({
      where: {
        website_id: websiteEntry.id,
        timestamp: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // last 30 days
        },
      },
    })

    const pageViewsByUrl = last30DaysPageViews.reduce((acc, pageview) => {
      acc.set(pageview.url, (acc.get(pageview.url) || 0) + 1)
      return acc
    }, new Map<string, number>())

    const totalPageViews = Array.from(pageViewsByUrl.values()).reduce(
      (total, count) => total + count,
      0
    )
    return c.html(
      <DomainPage
        domainName={domainName}
        websiteId={websiteEntry.id}
        totalPageViewsOverLast30Days={totalPageViews}
        urlPageViewsMap={pageViewsByUrl}
      />
    )
  } catch (error) {
    return c.html(<ErrorPage errorMsg={'Failed to load tracking data...'} />)
  }
})

serve(app)
