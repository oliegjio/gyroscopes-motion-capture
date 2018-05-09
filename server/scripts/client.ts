import { Socket } from 'net'

let socket: Socket = new Socket()

socket.connect(1337, 'localhost', () => {
    console.log('Connected')

    setInterval(() => {
        socket.write((Math.PI / 6).toString())
    }, 1000)
})

socket.on('data', (data: string) => { console.log('Message from server: ' + data) })
socket.on('close', () => { console.log('Closing connection') })