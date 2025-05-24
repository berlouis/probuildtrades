import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')

  try {
    const files = fs.readdirSync(uploadDir).map(file => `/uploads/${file}`)
    res.status(200).json({ files })
  } catch (error) {
    console.error('Failed to read uploads:', error)
    res.status(500).json({ error: 'Unable to fetch uploads' })
  }
}
