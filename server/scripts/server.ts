import { createServer, Server, Socket } from 'net'

let server: Server = createServer((socket: Socket) => {

    socket.write('You are connected')

    socket.on('data', (data) => {
        console.log(data)
    })

    socket.on('end', () => {
        console.log('Closing connection')
    })

    socket.pipe(socket)
})

server.on('connection', (socket: Socket) => {
    console.log('New connection')
})

server.listen(1337, 'localhost')
