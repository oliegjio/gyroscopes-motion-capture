import * as THREE from 'three'

import { getHandMesh } from './hand'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

const VIEW_ANGLE = 60
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 10000

const container = document.querySelector('#scene')

const renderer = new THREE.WebGLRenderer()
const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
const scene = new THREE.Scene()

scene.add(camera)
scene.add(getHandMesh())

renderer.setSize(WIDTH, HEIGHT)
renderer.setClearColor(0x000000, 1)
container.appendChild(renderer.domElement)