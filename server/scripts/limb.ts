import * as B from 'babylonjs'

export class Limb {
    private mesh: B.Mesh
    private line: B.LinesMesh
    private path: B.Vector3[]

    public constructor(thickness: number, length: number, public scene: B.Scene) {
        this.mesh = B.Mesh.CreateBox('Box', thickness, scene, true)
        this.mesh.scaling.x = length

        let elbowPosition = new B.Vector3(thickness / 2, 0, 0)
        let wristPosition = new B.Vector3(-thickness / 2, 0, 0)

        let material = new B.StandardMaterial('Material', scene)
        material.alpha = 0

        this.elbow = B.Mesh.CreateSphere('Elbow', 0, 0, scene)
        this.elbow.material = material
        this.elbow.parent = this.mesh
        this.elbow.position = elbowPosition
        
        this.wrist = B.Mesh.CreateSphere('Wrist', 0, 0, scene)
        this.wrist.material = material
        this.wrist.parent = this.mesh 
        this.wrist.position = wristPosition

        this.path = [elbowPosition.multiplyByFloats(5, 5, 5), wristPosition.multiplyByFloats(5, 5, 5)]

        this.line = B.Mesh.CreateLines('Line', this.path, scene, true)
        this.line.parent = this.mesh
    }

    public translate(v: B.Vector3, n: number) { this.mesh.translate(v, n) }
    public rotate(v: B.Vector3, n: number) { this.mesh.rotate(v, n) }

    private elbow: B.Mesh
    public getElbowPoint() { return this.elbow.getAbsolutePosition() }

    private wrist: B.Mesh
    public getWristPoint() { return this.wrist.getAbsolutePosition() }
}