import * as THREE from 'three'

export let getHandMesh = (): THREE.Mesh => {
    // let geometry = new THREE.Geometry()
    // geometry.vertices.push(
    //     new THREE.Vector3(-10, 10, 0),
    //     new THREE.Vector3(-10, -10, 0),
    //     new THREE.Vector3(10, -10, 0)
    // )
    // geometry.faces.push(new THREE.Face3(0, 1, 2))
    // geometry.computeBoundingSphere()

    // let material = new THREE.MeshBasicMaterial({color: 0xffff00})

    // let mesh = new THREE.Mesh(geometry, material)

    let geometry = new THREE.BoxGeometry(1, 1, 1)
    let material = new THREE.MeshBasicMaterial({color: 0xffff00})
    let mesh = new THREE.Mesh(geometry, material)

    return mesh
}