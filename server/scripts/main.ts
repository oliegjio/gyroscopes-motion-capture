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

let limbs: Limb[] = []

let leftLowerLimb: Limb = new Limb(4, 8, scene)
leftLowerLimb.translate(B.Vector3.Right(), 90)
leftLowerLimb.saveTransform()
limbs.push(leftLowerLimb)

let leftUpperLimb: Limb = new Limb(5, 8, scene)
leftUpperLimb.translate(B.Vector3.Right(), 40)
leftUpperLimb.saveTransform()
limbs.push(leftUpperLimb)

let rightLowerLimb: Limb = new Limb(4, 8, scene)
rightLowerLimb.translate(B.Vector3.Left(), 90)
rightLowerLimb.saveTransform()
limbs.push(rightLowerLimb)

let rightUpperLimb: Limb = new Limb(5, 8, scene)
rightUpperLimb.translate(B.Vector3.Left(), 40)
rightUpperLimb.saveTransform()
limbs.push(rightUpperLimb)

scene.registerAfterRender(() => {})
engine.runRenderLoop(() => { scene.render() })

window.onresize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

let rotateVector = (vector: B.Vector3, on: B.Vector3): void => {
    
}

let degreesToRadians = (n: number): number => { return n * Math.PI / 180 }

let removeGForce = (n: number): number => { if (Math.abs(n) >= 1.8) return n; else return 0 }

let transform = (limb: Limb, data: number[]): void => {
    let moves = data.splice(0, 3).map(x => x * 9.8)
    let rotates = data.splice(3, 3).map(x => degreesToRadians(x / 8))
    
    moves[2] = removeGForce(moves[2])
    
    limb.translate(B.Vector3.Left(), moves[0])
    limb.translate(B.Vector3.Up(), moves[1])
    limb.translate(B.Vector3.Forward(), moves[2])
    
    limb.rotate(B.Vector3.Left(), rotates[0])
    limb.rotate(B.Vector3.Up(), rotates[1])
    limb.rotate(B.Vector3.Forward(), rotates[2])
}

let transformWithData = (data: string) => {
    let parsed: number[] = data.split('|').map(x => parseFloat(x))
    let id = parsed.shift()
    transform(limbs[id], parsed)
}

let isCalibrateRequest = (data: string): boolean => { if (data[0] == '>') return true; else return false }
let calibrate = (data: string): void => { limbs[parseInt(data[1])].resetTransform() }

let handleRequest = (data: string): void => {
    console.log(data)
    if (isCalibrateRequest(data)) calibrate(data)
    else transformWithData(data)
}

let server: Server = createServer((socket: Socket) => {
    socket.write('You are connected')
    socket.on('data', (data) => { handleRequest(data.toString()) })
    socket.on('end', () => { console.log('Closing connection') })
})
server.on('connection', (socket: Socket) => { console.log('Client connected') })
server.listen(1337, '192.168.1.154')
