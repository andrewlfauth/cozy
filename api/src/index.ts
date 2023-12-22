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

app.post('/cozy-api/page-views', (req: Request, res: Response) => {
  const { pageUrl, trackingDomain } = req.body

  if (!pageUrl || !trackingDomain) {
    return res.status(400).json({ error: 'Missing required data' })
  }

  res.json({ success: true, message: 'Page view registered successfully' })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
