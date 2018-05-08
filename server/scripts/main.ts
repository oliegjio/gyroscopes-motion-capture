import * as B from 'babylonjs'

import { Limb } from './limb'

let canvas: HTMLCanvasElement = document.querySelector('#canvas')

let engine = new B.Engine(canvas, true, null, true)
let scene = new B.Scene(engine)
let light = new B.PointLight('Light', new B.Vector3(0, 100, 100), scene)
let camera = new B.ArcRotateCamera('Camera', 0, 0.8, 100, B.Vector3.Zero(), scene)
camera.attachControl(canvas, true)
camera.position = new B.Vector3(50, 50, 50)

export let middlePoint = (point1: B.Vector3, point2: B.Vector3) => {
    let x = (point1.x + point2.x) / 2
    let y = (point1.y + point2.y) / 2
    let z = (point1.z + point2.z) / 2
    return new B.Vector3(x, y, z)
}

let worldX = B.Mesh.CreateLines('WorldXAxis', [B.Vector3.Zero(), new B.Vector3(1000, 0, 0)], scene)
let worldY = B.Mesh.CreateLines('WorldYAxis', [B.Vector3.Zero(), new B.Vector3(0, 1000, 0)], scene)
let worldZ = B.Mesh.CreateLines('WorldZAxis', [B.Vector3.Zero(), new B.Vector3(0, 0, 1000)], scene)
worldX.color = B.Color3.Red()
worldY.color = B.Color3.Green()
worldZ.color = B.Color3.Blue()

let updateJoinSphere = (sphere: B.Mesh, limb1: Limb, limb2: Limb) => {
    let middle = middlePoint(limb1.getFrontPoint(), limb2.getFrontPoint())
    sphere.position = middle
}

let lowerLimb = new Limb(4.5, 5, scene)
lowerLimb.translate(B.Vector3.Up(), 25)
lowerLimb.translate(B.Vector3.Left(), 6)
lowerLimb.rotate(B.Vector3.Forward(), Math.PI / 2)

let upperLimb = new Limb(6, 6, scene)

let sphere = B.Mesh.CreateSphere('Sphere1', 30, 9, scene)

scene.registerAfterRender(() => {
    // lowerLimb.rotate(new B.Vector3(0, 0, 1), Math.PI / 100)
    updateJoinSphere(sphere, lowerLimb, upperLimb)
})

engine.runRenderLoop(() => {
    scene.render()
})

window.onresize = (event: Event) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}