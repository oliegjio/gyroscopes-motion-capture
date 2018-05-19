import * as B from 'babylonjs'

export let middlePoint = (point1: B.Vector3, point2: B.Vector3): B.Vector3 => {
    let x = (point1.x + point2.x) / 2
    let y = (point1.y + point2.y) / 2
    let z = (point1.z + point2.z) / 2
    return new B.Vector3(x, y, z)
}

export let rotateAroundX = (v: B.Vector3, a: number): B.Vector3 => {
    return new B.Vector3(v.x,
                         v.y * Math.cos(a) - v.z * Math.sin(a),
                         v.y * Math.sin(a) + v.z * Math.cos(a))
}

export let rotateAroundY = (v: B.Vector3, a: number): B.Vector3 => {
    return new B.Vector3(v.x * Math.cos(a) + v.z * Math.sin(a),
                         v.y,
                         -v.x * Math.sin(a) + v.z * Math.cos(a))
}

export let rotateAroundZ = (v: B.Vector3, a: number): B.Vector3 => {
    return new B.Vector3(v.x * Math.cos(a) - v.y * Math.sin(a),
                         v.x * Math.sin(a) + v.y * Math.cos(a),
                         v.z)
}

export let rotateVector = (v: B.Vector3, on: B.Vector3): B.Vector3 => {
    return rotateAroundY(rotateAroundX(rotateAroundZ(v, on.z), on.x), on.y)
}

export let rotateVectorQ = (v: B.Vector3, on: B.Vector3): B.Vector3 => {
    let q, vr
    let m = new B.Matrix()
    
    q = B.Quaternion.RotationAxis(v, on.z)
    q.toRotationMatrix(m)
    vr = B.Vector3.TransformCoordinates(v, m)
    
    q = B.Quaternion.RotationAxis(v, on.x)
    q.toRotationMatrix(m)
    vr = B.Vector3.TransformCoordinates(vr, m)
    
    q = B.Quaternion.RotationAxis(v, on.y)
    q.toRotationMatrix(m)
    vr = B.Vector3.TransformCoordinates(vr, m)
    
    return vr
}

export let degreesToRadians = (n: number): number => { return n * Math.PI / 180 }
export let radiansToDegrees = (n: number): number => { return n * 180 / Math.PI }