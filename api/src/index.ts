import express, { Request, Response } from 'express'
import cors from 'cors'
import fs from 'fs'

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

app.post('/cozy-api/page-views', (req: Request, res: Response) => {
  const { pageUrl, trackingDomain } = req.body

  if (!pageUrl || !trackingDomain) {
    return res.status(400).json({ error: 'Missing required data' })
  }
  console.log(pageUrl, trackingDomain)

  res.json({ success: true, message: 'Page view registered successfully' })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
