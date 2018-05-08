"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("babylonjs");
var Limb = /** @class */ (function () {
    function Limb(thickness, length, scene) {
        this.scene = scene;
        this.mesh = B.Mesh.CreateBox('Box', thickness, scene, true);
        this.mesh.scaling.x = length;
        var elbowPosition = new B.Vector3(thickness / 2, 0, 0);
        var wristPosition = new B.Vector3(-thickness / 2, 0, 0);
        var material = new B.StandardMaterial('Material', scene);
        material.alpha = 0;
        this.elbow = B.Mesh.CreateSphere('Elbow', 0, 0, scene);
        this.elbow.material = material;
        this.elbow.parent = this.mesh;
        this.elbow.position = elbowPosition;
        this.wrist = B.Mesh.CreateSphere('Wrist', 0, 0, scene);
        this.wrist.material = material;
        this.wrist.parent = this.mesh;
        this.wrist.position = wristPosition;
        this.path = [elbowPosition.multiplyByFloats(5, 5, 5), wristPosition.multiplyByFloats(5, 5, 5)];
        this.line = B.Mesh.CreateLines('Line', this.path, scene, true);
        this.line.parent = this.mesh;
    }
    Limb.prototype.translate = function (v, n) { this.mesh.translate(v, n); };
    Limb.prototype.rotate = function (v, n) { this.mesh.rotate(v, n); };
    Limb.prototype.getElbowPoint = function () { return this.elbow.getAbsolutePosition(); };
    Limb.prototype.getWristPoint = function () { return this.wrist.getAbsolutePosition(); };
    return Limb;
}());
exports.Limb = Limb;
