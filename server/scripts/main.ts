import * as T from 'three'

import { createSphereMesh, createBoxMesh, move3D } from './meshes'
import { Limb } from './limb'
import { N } from './geometry'

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
scene.background = new T.Color(255, 0, 0)
scene.add(camera)
scene.add(light)
container.appendChild(renderer.domElement)

/////////////////////////////////
// GENERAL:
/////////////////////////////////

let updateJoinSphere = (sphere: T.Mesh, box1: T.Mesh, box2: T.Mesh) => {
    let box1Geometry = box1.geometry as T.Geometry
    let box2Geometry = box2.geometry as T.Geometry
    box1Geometry.computeBoundingBox()
}

// let sphere = createSphereMesh(15)
// moveMesh(sphere, 0, 0, -300)
// scene.add(sphere);

// let box1 = createBoxMesh(30, 100, 30)
// moveMesh(box1, -50, 0, -300)
// scene.add(box1)

// let box2 = createBoxMesh(100, 30, 30)
// moveMesh(box2, -150, -100, -300)
// scene.add(box2)

let limb1 = new Limb(30, 200)
limb1.move(-50, 0, -300)
scene.add(limb1.getLine())
scene.add(limb1.getMesh())



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
    renderer.render(scene, camera)
    limb1.rotate(N.z, Math.PI / 100)
    limb1.rotate(N.x, Math.PI / 100)
    limb1.rotate(N.y, Math.PI / 100)
    requestAnimationFrame(update)
}
requestAnimationFrame(update)