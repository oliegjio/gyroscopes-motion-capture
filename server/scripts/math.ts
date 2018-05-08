import * as B from 'babylonjs'

export let middlePoint = (point1: B.Vector3, point2: B.Vector3): B.Vector3 => {
    let x = (point1.x + point2.x) / 2
    let y = (point1.y + point2.y) / 2
    let z = (point1.z + point2.z) / 2
    return new B.Vector3(x, y, z)
}