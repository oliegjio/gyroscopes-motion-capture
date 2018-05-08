import * as B from 'babylonjs'

import { Limb } from './limb'
import { middlePoint } from './math'

export class Hand {
    private hand: B.Mesh
    private lowerLimb: Limb
    private upperLimb: Limb
    private join: B.Mesh

    public constructor(private scene: B.Scene, limbSize: number = 5) {
        this.hand = B.Mesh.CreateBox('Parent', 1, scene)

        let lowerLimbThickness = limbSize
        let upperLimbThickness = limbSize * 1.5
        let lowerLimbLength = limbSize * 1.3
        let upperLimbLength = limbSize * 1.1

        this.lowerLimb = new Limb(lowerLimbThickness, lowerLimbLength, scene)
        this.lowerLimb.setParent(this.hand)
        this.upperLimb = new Limb(upperLimbThickness, upperLimbLength, scene)
        this.upperLimb.setParent(this.hand)
        this.join = B.Mesh.CreateSphere('Join', 30, limbSize * 2, scene)
        this.join.parent = this.hand

        this.lowerLimb.rotate(B.Vector3.Forward(), - Math.PI / 2)
        this.lowerLimb.translate(B.Vector3.Up(), limbSize * 6.5)
        this.lowerLimb.translate(B.Vector3.Left(), limbSize * 7)

        this.updateJoinPosition()
    }

    private updateJoinPosition(): void {
        let middle = middlePoint(this.lowerLimb.getBackPoint(), this.upperLimb.getFrontPoint())
        this.join.position = middle
    }

    public translate(v: B.Vector3, n: number): void {
        this.hand.translate(v, n, B.Space.WORLD)
    }

    public rotate(v: B.Vector3, n: number): void {
        this.hand.rotate(v, n, B.Space.WORLD)
    }

    public translateLowerLimb(v: B.Vector3, n: number) { this.lowerLimb.translate(v, n) }
    public translateUpperLimb(v: B.Vector3, n: number) { this.upperLimb.translate(v, n) }
    public rotateLowerLimb(v: B.Vector3, n: number) { this.lowerLimb.rotate(v, n) }
    public rotateUpperLimb(v: B.Vector3, n: number) { this.upperLimb.rotate(v, n) }
}