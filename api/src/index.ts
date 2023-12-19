import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
const port = 8000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.post('/cozy-api/page-views', (req: Request, res: Response) => {
  const { pageUrl } = req.body

  if (!pageUrl) {
    return res.status(400).json({ error: 'Missing required data' })
  }

  res.json({ success: true, message: 'Page view registered successfully' })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
