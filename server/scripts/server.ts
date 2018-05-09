import { createServer, Server, Socket } from 'net'

let server: Server = createServer((socket: Socket) => {

    // Send to the client:
    // socket.write('You are connected')

    // Get data from the client:
    socket.on('data', (data) => {
        console.log(data)
    })

    // Closing connection with the client:
    socket.on('end', () => {
        console.log('Closing connection')
    })

    socket.pipe(socket)
})

server.on('connection', (socket: Socket) => {
    console.log('New connection')
})

server.listen(1337, 'localhost')
