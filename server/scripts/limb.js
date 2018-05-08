"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("babylonjs");
var Limb = /** @class */ (function () {
    function Limb(thickness, length, scene) {
        this.scene = scene;
        this.mesh = B.Mesh.CreateBox('Box', thickness, scene, true);
        this.mesh.scaling.x = length;
        var backSpherePosition = new B.Vector3(thickness / 2, 0, 0);
        var frontSpherePosition = new B.Vector3(-thickness / 2, 0, 0);
        this.transparentMaterial = new B.StandardMaterial('TransparentMaterial', scene);
        this.transparentMaterial.alpha = 0;
        this.backPointMaterial = new B.StandardMaterial('BackSphereMaterial', scene);
        this.backPointMaterial.diffuseColor = new B.Color3(0, 1, 0);
        this.frontPointMaterial = new B.StandardMaterial('FrontSphereMaterial', scene);
        this.frontPointMaterial.diffuseColor = new B.Color3(1, 0, 0);
        this.backPoint = B.Mesh.CreateSphere('Elbow', 0, 0, scene);
        this.backPoint.parent = this.mesh;
        this.backPoint.position = backSpherePosition;
        this.frontPoint = B.Mesh.CreateSphere('Wrist', 0, 0, scene);
        this.frontPoint.parent = this.mesh;
        this.frontPoint.position = frontSpherePosition;
        this.path = [backSpherePosition.multiplyByFloats(5, 5, 5), frontSpherePosition.multiplyByFloats(5, 5, 5)];
        this.line = B.Mesh.CreateLines('Line', this.path, scene);
        this.line.setEnabled(false);
        this.line.parent = this.mesh;
        this.showGuideLine();
        this.showGuidePoints();
    }
    Limb.prototype.showGuidePoints = function () {
        this.frontPoint.material = this.frontPointMaterial;
        this.backPoint.material = this.backPointMaterial;
    };
    Limb.prototype.hideGuidePoints = function () {
        this.frontPoint.material = this.transparentMaterial;
        this.backPoint.material = this.transparentMaterial;
    };
    Limb.prototype.showGuideLine = function () { this.line.setEnabled(true); };
    Limb.prototype.hideGuideLine = function () { this.line.setEnabled(false); };
    Limb.prototype.translate = function (v, n) { this.mesh.translate(v, n); };
    Limb.prototype.rotate = function (v, n) { this.mesh.rotate(v, n); };
    Limb.prototype.getBackPoint = function () { return this.backPoint.getAbsolutePosition(); };
    Limb.prototype.getFrontPoint = function () { return this.frontPoint.getAbsolutePosition(); };
    return Limb;
}());
exports.Limb = Limb;
