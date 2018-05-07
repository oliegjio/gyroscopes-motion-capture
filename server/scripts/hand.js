"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
exports.getHandMesh = function () {
    // let geometry = new THREE.Geometry()
    // geometry.vertices.push(
    //     new THREE.Vector3(-10, 10, 0),
    //     new THREE.Vector3(-10, -10, 0),
    //     new THREE.Vector3(10, -10, 0)
    // )
    // geometry.faces.push(new THREE.Face3(0, 1, 2))
    // geometry.computeBoundingSphere()
    // let material = new THREE.MeshBasicMaterial({color: 0xffff00})
    // let mesh = new THREE.Mesh(geometry, material)
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
};
