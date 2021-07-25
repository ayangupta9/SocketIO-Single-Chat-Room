const express = require('express')
const SocketIO = require('socket.io')

let app = express()
const PORT = process.env.PORT || 5000
let server = app.listen(PORT, () => {
  console.log('Listening at 5000')
})

let allHandles = {}

app.use(express.static('./public'))

let io = SocketIO(server)

io.on('connection', function (socket) {
  socket.on('chat', data => {
    if (
      allHandles[socket.id] === undefined &&
      !Object.values(allHandles).includes(data.handle.trim())
    ) {
      allHandles[socket.id] = data.handle.trim()
      io.sockets.emit('chat', data)
    } else {
      if (allHandles[socket.id] !== data.handle.trim()) {
        socket.emit('alreadyExistsError', `${data.handle} already exists`)
      } else {
        io.sockets.emit('chat', data)
      }
    }
  })

  socket.on('typing', data => {
    socket.broadcast.emit('typing', data)
  })

  socket.on('notTyping', () => {
    socket.broadcast.emit('notTyping', true)
  })
})
