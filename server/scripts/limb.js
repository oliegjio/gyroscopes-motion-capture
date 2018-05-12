"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("babylonjs");
var Limb = /** @class */ (function () {
    function Limb(thickness, length, scene) {
        this.scene = scene;
        this.savedPosition = B.Vector3.Zero();
        this.savedRotation = B.Vector3.Zero();
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
        this.backPoint = B.Mesh.CreateSphere('Elbow', 0, 0, scene, true);
        this.backPoint.parent = this.mesh;
        this.backPoint.position = backSpherePosition;
        this.frontPoint = B.Mesh.CreateSphere('Wrist', 0, 0, scene, true);
        this.frontPoint.parent = this.mesh;
        this.frontPoint.position = frontSpherePosition;
        this.path = [backSpherePosition.multiplyByFloats(5, 5, 5), frontSpherePosition.multiplyByFloats(5, 5, 5)];
        this.line = B.Mesh.CreateLines('Line', this.path, scene, true);
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
    Limb.prototype.translate = function (v, n, s) {
        if (s === void 0) { s = B.Space.WORLD; }
        this.mesh.translate(v, n, s);
    };
    Limb.prototype.rotate = function (v, n, s) {
        if (s === void 0) { s = B.Space.WORLD; }
        this.mesh.rotate(v, n, s);
    };
    Limb.prototype.resetTransform = function () {
        this.mesh.rotation = this.savedRotation.clone();
        this.mesh.position = this.savedPosition.clone();
    };
    Limb.prototype.saveTransform = function () {
        this.savedRotation = this.mesh.rotation.clone();
        this.savedPosition = this.mesh.position.clone();
    };
    Limb.prototype.getBackPointAbsolute = function () {
        this.mesh.computeWorldMatrix(true);
        return this.backPoint.getAbsolutePosition();
    };
    Limb.prototype.getFrontPointAbsolute = function () {
        this.mesh.computeWorldMatrix(true);
        return this.frontPoint.getAbsolutePosition();
    };
    Limb.prototype.setParent = function (parent) { this.mesh.parent = parent; };
    return Limb;
}());
exports.Limb = Limb;
