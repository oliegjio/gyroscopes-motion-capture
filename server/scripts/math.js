"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("babylonjs");
exports.middlePoint = function (point1, point2) {
    var x = (point1.x + point2.x) / 2;
    var y = (point1.y + point2.y) / 2;
    var z = (point1.z + point2.z) / 2;
    return new B.Vector3(x, y, z);
};
