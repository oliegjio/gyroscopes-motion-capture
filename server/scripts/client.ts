import { Socket } from 'net'

let socket: Socket = new Socket()

// AA|BBB|CCC|DDD|EEE|FFF|GGG
// AA - Bracer ID.
// BBB - X translation.
// CCC - Y translation.
// DDD - Z translation.
// EEE - X rotation.
// FFF - Y rotation.
// GGG - Z rotation.

let rnd = (min: number, max: number) => { return (Math.floor(Math.random() * (max - min + 1)) + min).toString() }

socket.connect(1337, 'localhost', () => {
    console.log('Connected')

    setInterval(() => {
        let data = '01' + '|' + rnd(1, 2) + '|' + rnd(1, 2) + '|' + rnd(1, 2) + '|' +
            rnd(Math.PI / 10, Math.PI / 20) + '|' + rnd(Math.PI / 10, Math.PI / 20) + '|' +
            rnd(Math.PI / 10, Math.PI / 20)
        socket.write(data)
        console.log(data)
    }, 1000)
})
socket.on('data', (data: string) => { console.log('Message from server: ' + data) })
socket.on('close', () => { console.log('Closing connection') })