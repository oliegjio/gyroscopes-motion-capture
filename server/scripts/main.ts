import * as B from 'babylonjs'
import { createServer, Server, Socket } from 'net'

import { Limb } from './limb'

let canvas: HTMLCanvasElement = document.querySelector('#canvas')
let engine = new B.Engine(canvas, true, null, true)
let scene = new B.Scene(engine)
let light = new B.PointLight('Light', new B.Vector3(0, 100, 100), scene)
let camera = new B.ArcRotateCamera('Camera', 0, 0.8, 100, B.Vector3.Zero(), scene)
let cameraD = 200
camera.setPosition(new B.Vector3(cameraD, cameraD, cameraD))
camera.attachControl(canvas, true)

let worldX = B.Mesh.CreateLines('WorldXAxis', [B.Vector3.Zero(), new B.Vector3(1000, 0, 0)], scene)
let worldY = B.Mesh.CreateLines('WorldYAxis', [B.Vector3.Zero(), new B.Vector3(0, 1000, 0)], scene)
let worldZ = B.Mesh.CreateLines('WorldZAxis', [B.Vector3.Zero(), new B.Vector3(0, 0, 1000)], scene)
worldX.color = B.Color3.Red()
worldY.color = B.Color3.Green()
worldZ.color = B.Color3.Blue()

let leftLowerLimb: Limb = new Limb(4, 8, scene)
let leftUpperLimb: Limb = new Limb(5, 8, scene)
leftLowerLimb.translate(B.Vector3.Right(), 90)
leftUpperLimb.translate(B.Vector3.Right(), 40)

let rightLowerLimb: Limb = new Limb(4, 8, scene)
let rightUpperLimb: Limb = new Limb(5, 8, scene)
rightLowerLimb.translate(B.Vector3.Left(), 90)
rightUpperLimb.translate(B.Vector3.Left(), 40)

scene.registerAfterRender(() => {})
engine.runRenderLoop(() => { scene.render() })

window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

let server: Server = createServer((socket: Socket) => {
    socket.write('You are connected')

    socket.on('data', (data) => {
        console.log(data)
        leftLowerLimb.rotate(B.Vector3.Forward(), parseFloat(data))
    })

    socket.on('end', () => { console.log('Closing connection') })
    // socket.pipe(socket)
})
server.on('connection', (socket: Socket) => { console.log('New connection') })
server.listen(1337, 'localhost')
