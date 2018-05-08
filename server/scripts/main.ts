import * as B from 'babylonjs'

import { Hand } from './hand'

let canvas: HTMLCanvasElement = document.querySelector('#canvas')

let engine = new B.Engine(canvas, true, null, true)
let scene = new B.Scene(engine)
let light = new B.PointLight('Light', new B.Vector3(0, 100, 100), scene)
let camera = new B.ArcRotateCamera('Camera', 0, 0.8, 100, B.Vector3.Zero(), scene)
camera.attachControl(canvas, true)
camera.position = new B.Vector3(50, 50, 50)

let worldX = B.Mesh.CreateLines('WorldXAxis', [B.Vector3.Zero(), new B.Vector3(1000, 0, 0)], scene)
let worldY = B.Mesh.CreateLines('WorldYAxis', [B.Vector3.Zero(), new B.Vector3(0, 1000, 0)], scene)
let worldZ = B.Mesh.CreateLines('WorldZAxis', [B.Vector3.Zero(), new B.Vector3(0, 0, 1000)], scene)
worldX.color = B.Color3.Red()
worldY.color = B.Color3.Green()
worldZ.color = B.Color3.Blue()

let rightHand = new Hand(scene)
rightHand.rotate(B.Vector3.Forward(), Math.PI / 4)
rightHand.translate(B.Vector3.Left(), 10)

scene.registerAfterRender(() => {
    // rightHand.rotate(new B.Vector3(0, 0, 1), Math.PI / 100)
})

engine.runRenderLoop(() => {
    scene.render()
})

window.onresize = (event: Event) => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}