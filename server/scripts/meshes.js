"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("three");
exports.sphereMesh = function (radius, material) {
    var segments = radius * 10;
    var rings = radius * 10;
    if (!material)
        material = new T.MeshStandardMaterial();
    var sphere = new T.SphereGeometry(radius, segments, rings);
    return new T.Mesh(sphere, material);
};
exports.boxMesh = function (width, height, depth, material) {
    if (!material)
        material = new T.MeshStandardMaterial();
    var box = new T.BoxGeometry(width, height, depth);
    return new T.Mesh(box, material);
};
exports.move = function (mesh, x, y, z) {
    mesh.position.setX(x);
    mesh.position.setY(y);
    mesh.position.setZ(z);
};
