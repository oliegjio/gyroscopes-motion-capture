import * as T from 'three'

export let sphereMesh = (radius: number, material?: T.Material): T.Mesh => {
    let segments = radius * 3
    let rings = radius * 3
    if (!material) material = new T.MeshStandardMaterial()
    let sphere = new T.SphereGeometry(radius, segments, rings)
    return new T.Mesh(sphere, material)
}

export let boxMesh = (width: number, height: number, depth: number, material?: T.Material): T.Mesh => {
    if (!material) material = new T.MeshStandardMaterial()
    let box = new T.BoxGeometry(width, height, depth)
    return new T.Mesh(box, material) 
}

export let move = (object: T.Mesh | T.Line | T.Camera, x: number, y: number, z:number) => {
    object.position.setX(x)
    object.position.setY(y)
    object.position.setZ(z)
}

