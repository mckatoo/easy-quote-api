import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import routes from './routes'
import { readFileSync } from 'fs'
import path from 'path'

const api: express.Application = express()
const isDev = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
const version = isDev
  ? process.env.npm_package_version
  : readFileSync(path.join(__dirname, 'version.txt')).toString().trim()

if (!version) {
  throw new Error('Version not found. Please ensure version.txt exists or set npm_package_version in your environment.')
}

api.use(express.json())
api.use(cors())
if (!!process.env.SECRET_KEY && !isDev) {
  api.use((req: Request, res: Response, next: NextFunction) => {
    if (req.headers['x-app-token'] !== process.env.SECRET_KEY) {
      res.status(403).json({ error: 'Unauthorized' });
      return
    }
    next();
  });
}
api.use(express.urlencoded({ extended: true }))
api.use(routes)
api.get('/', (_request: Request, response: Response) => {
  response.json({ version })
})

export default api;