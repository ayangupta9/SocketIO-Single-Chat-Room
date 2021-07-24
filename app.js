const express = require('express')
const SocketIO = require('socket.io')
const randomColor = require('randomcolor')

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
    console.log(socket.id)
    //   socket.emit('alreadyExistsError', `${data.handle} already exists`)
    allHandles[handle.data] = socket.id
    io.sockets.emit('chat', data)
  })
})
