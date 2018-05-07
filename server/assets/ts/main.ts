import { createServer, Server, Socket } from 'net'

let server: Server = createServer((socket: Socket) => {
    socket.write('Echo server\n')
    socket.pipe(socket)
})

server.listen(1337, 'localhost')

function hello(compiler: string) {
    console.log(`Hello from ${compiler}`)
}
hello('Typescript')
