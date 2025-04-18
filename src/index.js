import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDB } from './lib/db.js'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { app, server } from './lib/socket.js'

dotenv.config()

const PORT = process.env.PORT || 5001

app.use(express.json({ limit: '3mb' }))
app.use(cookieParser())
app.use(
  cors({
    origin: 'https://mern-chat-frontend-lemon.vercel.app',
    credentials: true,
    exposedHeaders: ['set-cookie'],
  })
)

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectDB()
})
