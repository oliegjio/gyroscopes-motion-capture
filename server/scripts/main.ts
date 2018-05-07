import * as T from 'three'

import { sphereMesh, boxMesh, move } from './meshes'
import { Limb } from './limb'
import { N, point, middlePoint } from './geometry'

////////////////////////////////////
// SCENE:
////////////////////////////////////

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const VIEW_ANGLE = 60
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 10000

const container: HTMLElement = document.querySelector('#canvas')
const renderer = new T.WebGLRenderer()
const camera = new T.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
const scene = new T.Scene()
const light = new T.PointLight(0xff0000, 0.5)

light.position.setX(10)
light.position.setY(50)
light.position.setZ(130)
move(camera, 500, 500, 500)
camera.lookAt(point(0, 0, 0))
scene.background = new T.Color(255, 0, 0)
scene.add(camera)
scene.add(light)
container.appendChild(renderer.domElement)

/////////////////////////////////
// GENERAL:
/////////////////////////////////

let updateJoinSphere = (sphere: T.Mesh, limb1: Limb, limb2: Limb) => {
    let first = limb1.getElbowVertex()
    let second = limb2.getWristVertex()
    let middle = middlePoint(first, second)
    move(sphere, middle.x, middle.y, middle.z)
}

let joinSphere = sphereMesh(70)
scene.add(joinSphere)

let lowerLimb = new Limb(30, 200)
lowerLimb.move(100, 0, -100)
lowerLimb.rotate(N.y, Math.PI / 2)
lowerLimb.toScene(scene)

let upperLimb = new Limb(40, 250)
upperLimb.toScene(scene)

// let s1 = sphereMesh(70)
// let p1 = lowerLimb.getWristVertex()
// move(s1, p1.x, p1.y, p1.z)
// scene.add(s1)

////////////////////////////////
// EVENTS:
////////////////////////////////

window.onresize = (event: Event) => {
    container.style.width = window.innerWidth.toString()
    container.style.height = window.innerHeight.toString()
    renderer.setSize(window.innerWidth, window.innerHeight)
}
window.onresize(null)

let update = () => {
    lowerLimb.rotate(N.z, Math.PI / 100)
    // lowerLimb.rotate(N.x, Math.PI / 100)
    // lowerLimb.rotate(N.y, Math.PI / 100)

    console.log(lowerLimb.getElbowVertex())

    updateJoinSphere(joinSphere, lowerLimb, upperLimb)

    requestAnimationFrame(update)
    renderer.render(scene, camera)
}
requestAnimationFrame(update)


// // let lastUpdate = Date.now()
// let tick = () => {
//     // let now = Date.now()
//     // let delta = now - lastUpdate
//     // lastUpdate = now

//     lowerLimb.rotate(N.z, Math.PI / 100)

//     renderer.render(scene, camera)
//     updateJoinSphere(joinSphere, lowerLimb, upperLimb)
// }
// setInterval(tick, 0)