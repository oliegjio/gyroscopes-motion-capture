import * as B from 'babylonjs'

export class Limb {
    private readonly mesh: B.Mesh
    private readonly line: B.LinesMesh
    private readonly path: B.Vector3[]

    private readonly transparentMaterial: B.StandardMaterial
    private readonly frontPointMaterial: B.StandardMaterial
    private readonly backPointMaterial: B.StandardMaterial

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

    // public translate(v: B.Vector3, n: number, s: B.Space = B.Space.WORLD): void { this.mesh.translate(v, n, s) }
    public translate(v: B.Vector3, n: number, s: B.Space = B.Space.WORLD): void {
        this.mesh.position = new B.Vector3(v.x, v.y, v.z)
    }
    public rotate(v: B.Vector3, n: number, s: B.Space = B.Space.WORLD): void { this.mesh.rotate(v, n, s) }

    public resetTransform(): void {
        this.mesh.rotation = this.savedRotation.clone()
        this.mesh.position = this.savedPosition.clone()
    }

    private savedPosition: B.Vector3 = B.Vector3.Zero()
    private savedRotation: B.Vector3 = B.Vector3.Zero()
    public saveTransform(): void {
        this.savedRotation = this.mesh.rotation.clone()
        this.savedPosition = this.mesh.position.clone()
    }

    private backPoint: B.Mesh
    public getBackPointAbsolute(): B.Vector3 {
        this.mesh.computeWorldMatrix(true)
        return this.backPoint.getAbsolutePosition()
    }

    private frontPoint: B.Mesh
    public getFrontPointAbsolute(): B.Vector3 {
        this.mesh.computeWorldMatrix(true)
        return this.frontPoint.getAbsolutePosition()
    }

    public setParent(parent: B.Mesh): void { this.mesh.parent = parent }
}