import { Socket } from 'net'

let socket: Socket = new Socket()

let rnd = (min: number, max: number) => { return Math.floor(Math.random() * (max - min + 1)) + min }
let makeRequestString = (arr: number[]) => { return arr.map((x: number) => x.toString()).join('|') }

socket.connect(1337, '192.168.1.154', () => {
    console.log('Connected')
    setInterval(() => {
        // let data = makeRequestString([
        //     1, rnd(1, 2), rnd(1, 2), rnd(1, 2),
        //     rnd(Math.PI / 10, Math.PI / 20),
        //     rnd(Math.PI / 10, Math.PI / 20),
        //     rnd(Math.PI / 10, Math.PI / 20)
        // ])
        let data = makeRequestString([
            0, 1, 1, 1, Math.PI / 2, 0, 0 
        ])
        socket.write(data)
        console.log(data)
    }, 1000)
})
socket.on('data', (data: string) => { console.log('Received: ' + data) })
socket.on('close', () => { console.log('Closing connection') })
