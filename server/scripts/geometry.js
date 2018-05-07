"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("three");
exports.point = function (x, y, z) {
    return new T.Vector3(x, y, z);
};
exports.line = function (from, to) {
    return new T.Line3(from, to);
};
exports.face = function (a, b, c) {
    return new T.Face3(a, b, c);
};
exports.NL = {
    x: exports.line(exports.point(0, 0, 0), exports.point(1, 0, 0)),
    y: exports.line(exports.point(0, 0, 0), exports.point(0, 1, 0)),
    z: exports.line(exports.point(0, 0, 0), exports.point(0, 0, 1))
};
exports.N = {
    x: exports.point(1, 0, 0),
    y: exports.point(0, 1, 0),
    z: exports.point(0, 0, 1)
};
exports.lineDirectingVector = function (line) {
    return new T.Vector3(line.end.x - line.start.x, line.end.y - line.start.y, line.end.z - line.start.z);
};
exports.linesAngle = function (line1, line2) {
    var vec1 = exports.lineDirectingVector(line1);
    var vec2 = exports.lineDirectingVector(line2);
    var top = Math.abs(vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z);
    var first = Math.sqrt(vec1.x ^ 2 + vec1.y ^ 2 + vec1.z ^ 2);
    var second = Math.sqrt(vec2.x ^ 2 + vec2.y ^ 2 + vec2.z ^ 2);
    var bottom = first * second;
    return Math.acos(top / bottom);
};
exports.middlePoint = function (point1, point2) {
    var x = (point1.x + point2.x) / 2;
    var y = (point1.y + point2.y) / 2;
    var z = (point1.z + point2.z) / 2;
    return exports.point(x, y, z);
};
