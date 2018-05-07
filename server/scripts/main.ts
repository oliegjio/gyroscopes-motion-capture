import * as THREE from 'three'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const VIEW_ANGLE = 60
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 10000

const container: HTMLElement = document.querySelector('#canvas')

const renderer = new THREE.WebGLRenderer()
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
const scene = new THREE.Scene()
scene.background = new THREE.Color(255, 0, 0)
scene.add(camera)
container.appendChild(renderer.domElement)

const RADIUS = 50;
const SEGMENTS = 16;
const RINGS = 16;
let sphereMaterial = new THREE.MeshBasicMaterial({color: 0xffffff})
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(
    RADIUS,
    SEGMENTS,
    RINGS), sphereMaterial);
sphere.position.z = -300;
scene.add(sphere);

window.onresize = (event: Event) => {
    container.style.width = window.innerWidth.toString()
    container.style.height = window.innerHeight.toString()
    renderer.setSize(window.innerWidth, window.innerHeight)
}
window.onresize(null)

let update = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(update)
}
requestAnimationFrame(update)