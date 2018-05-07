import * as T from 'three'

import { point, face } from './geometry'
import { move3D } from './meshes';

export class Limb {
    private initMesh(thickness: number, length: number) {
        let geometry = new T.Geometry()
        let material = new T.MeshNormalMaterial()

        let a0 = point(0, 0, 0),         a1 = point(thickness, 0, 0),
            a2 = point(0, thickness, 0), a3 = point(thickness, thickness, 0)

        let b0 = point(0, 0, length),         b1 = point(thickness, 0, length),
            b2 = point(0, thickness, length), b3 = point(thickness, thickness, length)

        geometry.vertices.push(
            a0, a1, a2, a3, // Lower square.
            b0, b1, b2, b3 // Upper square.
        )
        geometry.faces.push(
            face(0, 2, 3), face(3, 1, 0), // Lower square.
            face(4, 5, 7), face(7, 6, 4), // Upper sqaure.
            face(6, 2, 0), face(0, 4, 6), // Left side.
            face(0, 1, 5), face(5, 4, 0), // Top side.
            face(1, 3, 7), face(7, 5, 1), // Right side.
            face(7, 3, 2), face(2, 6, 7) // Bottom side.
        )

        this.mesh = new T.Mesh(geometry, material)
    }

    private initLine(thickness: number, length: number) {
        let geometry = new T.Geometry()
        let material = new T.LineBasicMaterial()
        let center = thickness / 2

        let mult = 100

        geometry.vertices.push(
            point(center, center, 0 - 100),
            point(center, center, length + 100)
        )

        this.line = new T.Line(geometry, material)
    }

    public constructor(private thickness: number, private length: number) {
        this.initMesh(thickness, length)
        this.initLine(thickness, length)
    }

    public setMeshMaterial(material: T.Material) { this.mesh.material = material }
    public getMeshMaterial(): T.Material { return this.mesh.material as T.Material }

    private mesh: T.Mesh
    public getMesh(): T.Mesh { return this.mesh }

    private line: T.Line
    public getLine(): T.Line { return this.line }

    public move(x: number, y: number, z: number) {
        move3D(this.mesh, x, y, z)
        move3D(this.line, x, y, z)
    }

    public rotate(v: T.Vector3, r: number) {
        this.mesh.rotateOnAxis(v, r)
        this.line.rotateOnAxis(v, r)
    }
}