import express, { Request, Response } from 'express'
import cors from 'cors'
import fs from 'fs'
import { prisma } from './db'

const app = express()
const port = 8000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/tracking.js', (req, res) => {
  const trackingCode = fs.readFileSync('./public/tracking.ts', 'utf8')

  res.setHeader('Content-Type', 'application/javascript')
  res.send(trackingCode)
})

app.post('/register-site', async (req, res) => {
  const { trackingDomain } = req.body

  if (!trackingDomain) {
    res
      .status(400)
      .json({ status: 'failed', message: 'Missing required data.' })
  }

  try {
    await prisma.website.create({ data: { name: trackingDomain } })
  } catch (error) {
    res
      .status(400)
      .json({ status: 'failed', message: 'Missing required data.' })
  }

  res.status(201).json({
    status: 'success',
    message: `Registered new domain ${trackingDomain}`,
  })
})

app.post('/cozy-api/page-views', async (req: Request, res: Response) => {
  const { pageUrl: visitedPage, trackingDomain } = req.body

  if (!visitedPage || !trackingDomain) {
    return res.status(400).json({ error: 'Missing required data' })
  }

  try {
    const websiteEntry = await prisma.website.findFirst({
      where: {
        name: 'andrewfauth.dev',
      },
    })

    if (!websiteEntry) {
      res.status(401)
    }

    await prisma.pageView.create({
      data: {
        url: visitedPage,
        website_id: websiteEntry?.id!,
      },
    })
  } catch (error) {
    console.log(`Error tracking page view: ${error}`)
    res.status(500)
  }

  res
    .status(200)
    .json({ success: true, message: 'Page view registered successfully' })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
