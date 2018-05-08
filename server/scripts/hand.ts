import * as B from 'babylonjs'

import { Limb } from './limb'
import { middlePoint } from './math'

export class Hand {
    private hand: B.Mesh
    private lowerLimb: Limb
    private upperLimb: Limb
    private join: B.Mesh

    public constructor(private scene: B.Scene) {
        this.hand = B.Mesh.CreateBox('Parent', 1, scene)

        let limbSize = 5
        let lowerLimbProportion = 1.6
        let upperLimbProportion = 1.2
        let lowerLimbThickness = limbSize
        let upperLimbThickness = limbSize * Math.abs(lowerLimbProportion - upperLimbProportion + 1)
        let lowerLimbLength = lowerLimbThickness * lowerLimbProportion
        let upperLimbLength = upperLimbThickness * upperLimbProportion

        this.lowerLimb = new Limb(lowerLimbThickness, lowerLimbLength, scene)
        this.lowerLimb.setParent(this.hand)
        this.upperLimb = new Limb(upperLimbThickness, upperLimbLength, scene)
        this.upperLimb.setParent(this.hand)
        this.join = B.Mesh.CreateSphere('Join', 30, 9, scene)
        this.join.parent = this.hand

        this.lowerLimb.rotate(B.Vector3.Forward(), - Math.PI / 2)
        this.lowerLimb.translate(B.Vector3.Up().negate(), upperLimbLength * 2 + lowerLimbThickness * 2 + upperLimbThickness * 2)
        this.lowerLimb.translate(B.Vector3.Left(), lowerLimbThickness * 0.8)

        this.updateJoinPosition()
    }

    private updateJoinPosition(): void {
        let middle = middlePoint(this.lowerLimb.getBackPoint(), this.upperLimb.getFrontPoint())
        this.join.position = middle
    }

    public translate(v: B.Vector3, n: number): void {
        this.hand.translate(v, n)
    }

    public rotate(v: B.Vector3, n: number): void {
        this.hand.rotate(v, n)
    }
}