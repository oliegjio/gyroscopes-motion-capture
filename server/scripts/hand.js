"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("babylonjs");
var limb_1 = require("./limb");
var math_1 = require("./math");
var Hand = /** @class */ (function () {
    function Hand(scene, limbSize) {
        if (limbSize === void 0) { limbSize = 5; }
        this.scene = scene;
        this.hand = B.Mesh.CreateBox('Parent', 1, scene);
        var lowerLimbThickness = limbSize;
        var upperLimbThickness = limbSize * 1.5;
        var lowerLimbLength = limbSize * 1.3;
        var upperLimbLength = limbSize * 1.1;
        this.lowerLimb = new limb_1.Limb(lowerLimbThickness, lowerLimbLength, scene);
        this.lowerLimb.setParent(this.hand);
        this.upperLimb = new limb_1.Limb(upperLimbThickness, upperLimbLength, scene);
        this.upperLimb.setParent(this.hand);
        this.join = B.Mesh.CreateSphere('Join', 30, limbSize * 2, scene);
        this.join.parent = this.hand;
        this.lowerLimb.rotate(B.Vector3.Forward(), -Math.PI / 2);
        this.lowerLimb.translate(B.Vector3.Up(), limbSize * 6.5);
        this.lowerLimb.translate(B.Vector3.Left(), limbSize * 7);
        this.updateJoinPosition();
    }
    Hand.prototype.updateJoinPosition = function () {
        var middle = math_1.middlePoint(this.lowerLimb.getBackPoint(), this.upperLimb.getFrontPoint());
        this.join.position = middle;
    };
    Hand.prototype.translate = function (v, n) {
        this.hand.translate(v, n, B.Space.WORLD);
    };
    Hand.prototype.rotate = function (v, n) {
        this.hand.rotate(v, n, B.Space.WORLD);
    };
    Hand.prototype.translateLowerLimb = function (v, n) { this.lowerLimb.translate(v, n); };
    Hand.prototype.translateUpperLimb = function (v, n) { this.upperLimb.translate(v, n); };
    Hand.prototype.rotateLowerLimb = function (v, n) { this.lowerLimb.rotate(v, n); };
    Hand.prototype.rotateUpperLimb = function (v, n) { this.upperLimb.rotate(v, n); };
    return Hand;
}());
exports.Hand = Hand;
