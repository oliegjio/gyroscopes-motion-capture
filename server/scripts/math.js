"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("babylonjs");
exports.middlePoint = function (point1, point2) {
    var x = (point1.x + point2.x) / 2;
    var y = (point1.y + point2.y) / 2;
    var z = (point1.z + point2.z) / 2;
    return new B.Vector3(x, y, z);
};
exports.rotateAroundX = function (v, a) {
    return new B.Vector3(v.x, v.y * Math.cos(a) - v.z * Math.sin(a), v.y * Math.sin(a) + v.z * Math.cos(a));
};
exports.rotateAroundY = function (v, a) {
    return new B.Vector3(v.x * Math.cos(a) + v.z * Math.sin(a), v.y, -v.x * Math.sin(a) + v.z * Math.cos(a));
};
exports.rotateAroundZ = function (v, a) {
    return new B.Vector3(v.x * Math.cos(a) - v.y * Math.sin(a), v.x * Math.sin(a) + v.y * Math.cos(a), v.z);
};
exports.rotateVector = function (v, on) {
    return exports.rotateAroundY(exports.rotateAroundX(exports.rotateAroundZ(v, on.z), on.x), on.y);
};
exports.rotateVectorQ = function (v, on) {
    var q, vr;
    var m = new B.Matrix();
    q = B.Quaternion.RotationAxis(v, on.z);
    q.toRotationMatrix(m);
    vr = B.Vector3.TransformCoordinates(v, m);
    q = B.Quaternion.RotationAxis(v, on.x);
    q.toRotationMatrix(m);
    vr = B.Vector3.TransformCoordinates(vr, m);
    q = B.Quaternion.RotationAxis(v, on.y);
    q.toRotationMatrix(m);
    vr = B.Vector3.TransformCoordinates(vr, m);
    return vr;
};
exports.degreesToRadians = function (n) { return n * Math.PI / 180; };
exports.radiansToDegrees = function (n) { return n * 180 / Math.PI; };
