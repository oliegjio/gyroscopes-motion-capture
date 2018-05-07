"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("three");
var geometry_1 = require("./geometry");
var meshes_1 = require("./meshes");
var Limb = /** @class */ (function () {
    function Limb(thickness, length) {
        this.thickness = thickness;
        this.length = length;
        this.initMesh(thickness, length);
        this.initLine(thickness, length);
    }
    Limb.prototype.initMesh = function (thickness, length) {
        this.meshGeometry = new T.Geometry();
        var material = new T.MeshNormalMaterial();
        var a0 = geometry_1.point(0, 0, 0), a1 = geometry_1.point(thickness, 0, 0), a2 = geometry_1.point(0, thickness, 0), a3 = geometry_1.point(thickness, thickness, 0);
        var b0 = geometry_1.point(0, 0, length), b1 = geometry_1.point(thickness, 0, length), b2 = geometry_1.point(0, thickness, length), b3 = geometry_1.point(thickness, thickness, length);
        this.meshGeometry.vertices.push(a0, a1, a2, a3, // Lower square.
        b0, b1, b2, b3 // Upper square.
        );
        this.meshGeometry.faces.push(geometry_1.face(0, 2, 3), geometry_1.face(3, 1, 0), // Lower square.
        geometry_1.face(4, 5, 7), geometry_1.face(7, 6, 4), // Upper sqaure.
        geometry_1.face(6, 2, 0), geometry_1.face(0, 4, 6), // Left side.
        geometry_1.face(0, 1, 5), geometry_1.face(5, 4, 0), // Top side.
        geometry_1.face(1, 3, 7), geometry_1.face(7, 5, 1), // Right side.
        geometry_1.face(7, 3, 2), geometry_1.face(2, 6, 7) // Bottom side.
        );
        this.mesh = new T.Mesh(this.meshGeometry, material);
    };
    Limb.prototype.initLine = function (thickness, length) {
        this.lineGeometry = new T.Geometry();
        var material = new T.LineBasicMaterial();
        var center = thickness / 2;
        var mult = 10;
        this.elbowVertex = geometry_1.point(center, center, 0 - mult);
        this.wristVertex = geometry_1.point(center, center, length + mult);
        this.lineGeometry.vertices.push(this.elbowVertex, this.wristVertex);
        this.line = new T.Line(this.lineGeometry, material);
    };
    Limb.prototype.setMeshMaterial = function (material) { this.mesh.material = material; };
    Limb.prototype.getMeshMaterial = function () { return this.mesh.material; };
    Limb.prototype.setLineMaterial = function (material) { this.line.material = material; };
    Limb.prototype.getLineMaterial = function (material) { return this.line.material; };
    Limb.prototype.getWristVertex = function () { return this.lineGeometry.vertices[0]; };
    Limb.prototype.getElbowVertex = function () { return this.lineGeometry.vertices[1]; };
    Limb.prototype.getMesh = function () { return this.mesh; };
    Limb.prototype.getLine = function () { return this.line; };
    Limb.prototype.move = function (x, y, z) {
        meshes_1.move(this.mesh, x, y, z);
        meshes_1.move(this.line, x, y, z);
        this.line.geometry.verticesNeedUpdate = true;
    };
    Limb.prototype.rotate = function (v, r) {
        this.mesh.rotateOnAxis(v, r);
        this.line.rotateOnAxis(v, r);
        this.line.geometry.verticesNeedUpdate = true;
    };
    Limb.prototype.toScene = function (scene) {
        scene.add(this.mesh);
        scene.add(this.line);
    };
    return Limb;
}());
exports.Limb = Limb;
