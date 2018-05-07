import { createServer, Server, Socket } from 'net'

let server: Server = createServer((socket: Socket) => {
    socket.write('Server started.\n')
    socket.pipe(socket)
})

server.on('connection', (socket: Socket) => {
    console.log('New connection.')
})

server.listen(1337, 'localhost')
