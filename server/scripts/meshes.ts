import * as T from 'three'

export let sphereMesh = (radius: number, material?: T.Material): T.Mesh => {
    let segments = radius * 10
    let rings = radius * 10
    if (!material) material = new T.MeshStandardMaterial()
    let sphere = new T.SphereGeometry(radius, segments, rings)
    return new T.Mesh(sphere, material)
}

export let boxMesh = (width: number, height: number, depth: number, material?: T.Material): T.Mesh => {
    if (!material) material = new T.MeshStandardMaterial()
    let box = new T.BoxGeometry(width, height, depth)
    return new T.Mesh(box, material) 
}

export let move = (mesh: T.Mesh | T.Line, x: number, y: number, z:number) => {
    mesh.position.setX(x)
    mesh.position.setY(y)
    mesh.position.setZ(z)
}