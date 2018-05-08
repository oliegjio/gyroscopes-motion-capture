import * as B from 'babylonjs'

export class Limb {
    private mesh: B.Mesh
    private line: B.LinesMesh
    private path: B.Vector3[]

    private transparentMaterial: B.StandardMaterial
    private frontPointMaterial: B.StandardMaterial
    private backPointMaterial: B.StandardMaterial

    public constructor(thickness: number, length: number, public scene: B.Scene) {
        this.mesh = B.Mesh.CreateBox('Box', thickness, scene, true)
        this.mesh.scaling.x = length

        let backSpherePosition = new B.Vector3(thickness / 2, 0, 0)
        let frontSpherePosition = new B.Vector3(-thickness / 2, 0, 0)

        this.transparentMaterial = new B.StandardMaterial('TransparentMaterial', scene)
        this.transparentMaterial.alpha = 0
        this.backPointMaterial = new B.StandardMaterial('BackSphereMaterial', scene)
        this.backPointMaterial.diffuseColor = new B.Color3(0, 1, 0)
        this.frontPointMaterial = new B.StandardMaterial('FrontSphereMaterial', scene)
        this.frontPointMaterial.diffuseColor = new B.Color3(1, 0, 0)

        this.backPoint = B.Mesh.CreateSphere('Elbow', 0, 0, scene, true)
        this.backPoint.parent = this.mesh
        this.backPoint.position = backSpherePosition
        
        this.frontPoint = B.Mesh.CreateSphere('Wrist', 0, 0, scene, true)
        this.frontPoint.parent = this.mesh 
        this.frontPoint.position = frontSpherePosition

        this.path = [backSpherePosition.multiplyByFloats(5, 5, 5), frontSpherePosition.multiplyByFloats(5, 5, 5)]
        this.line = B.Mesh.CreateLines('Line', this.path, scene, true)
        this.line.setEnabled(false)
        this.line.parent = this.mesh

        this.showGuideLine()
        this.showGuidePoints()
    }

    public showGuidePoints(): void {
        this.frontPoint.material = this.frontPointMaterial
        this.backPoint.material = this.backPointMaterial
    }

    public hideGuidePoints(): void {
        this.frontPoint.material = this.transparentMaterial
        this.backPoint.material = this.transparentMaterial
    }

    public showGuideLine(): void { this.line.setEnabled(true) }
    public hideGuideLine(): void { this.line.setEnabled(false) }

    public translate(v: B.Vector3, n: number): void { this.mesh.translate(v, n) }
    public rotate(v: B.Vector3, n: number): void { this.mesh.rotate(v, n) }

    private backPoint: B.Mesh
    public getBackPoint(): B.Vector3 {
        this.mesh.computeWorldMatrix(true)
        return this.backPoint.getAbsolutePosition().clone()
    }

    private frontPoint: B.Mesh
    public getFrontPoint(): B.Vector3 {
        this.mesh.computeWorldMatrix(true)
        return this.frontPoint.getAbsolutePosition().clone()
    }

    public setParent(parent: B.Mesh): void { this.mesh.parent = parent }
}