import { Socket } from 'net'

let socket: Socket = new Socket()

socket.connect(1337, 'localhost', () => {
    console.log('Connected')
    socket.write('Hello, server!')
})

socket.on('data', (data: string) => {
    console.log('Revieved: ' + data)
})

socket.on('close', () => {
    console.log('Closing')
})