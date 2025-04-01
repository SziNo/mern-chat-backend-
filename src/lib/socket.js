import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['https://mern-chat-frontend-lemon.vercel.app'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

export function getReceiverSocketId(userId) {
  return userSocketMap[userId]
}

// contains online users. {userId: socketId}
const userSocketMap = {}

io.on('connection', (socket) => {
  console.log('A user connected', socket.id)

  const userId = socket.handshake.query.userId
  if (userId) userSocketMap[userId] = socket.id

  // io.emit() is used to send events to all the connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id)
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { io, app, server }
