"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("babylonjs");
var limb_1 = require("./limb");
var math_1 = require("./math");
var Hand = /** @class */ (function () {
    function Hand(scene) {
        this.scene = scene;
        this.hand = B.Mesh.CreateBox('Parent', 1, scene);
        var limbSize = 5;
        var lowerLimbProportion = 1.6;
        var upperLimbProportion = 1.2;
        var lowerLimbThickness = limbSize;
        var upperLimbThickness = limbSize * Math.abs(lowerLimbProportion - upperLimbProportion + 1);
        var lowerLimbLength = lowerLimbThickness * lowerLimbProportion;
        var upperLimbLength = upperLimbThickness * upperLimbProportion;
        this.lowerLimb = new limb_1.Limb(lowerLimbThickness, lowerLimbLength, scene);
        this.lowerLimb.setParent(this.hand);
        this.upperLimb = new limb_1.Limb(upperLimbThickness, upperLimbLength, scene);
        this.upperLimb.setParent(this.hand);
        this.join = B.Mesh.CreateSphere('Join', 30, 9, scene);
        this.join.parent = this.hand;
        this.lowerLimb.rotate(B.Vector3.Forward(), -Math.PI / 2);
        this.lowerLimb.translate(B.Vector3.Up().negate(), upperLimbLength * 2 + lowerLimbThickness * 2 + upperLimbThickness * 2);
        this.lowerLimb.translate(B.Vector3.Left(), lowerLimbThickness * 0.8);
        this.updateJoinPosition();
    }
    Hand.prototype.updateJoinPosition = function () {
        var middle = math_1.middlePoint(this.lowerLimb.getBackPoint(), this.upperLimb.getFrontPoint());
        this.join.position = middle;
    };
    Hand.prototype.translate = function (v, n) {
        this.hand.translate(v, n);
    };
    Hand.prototype.rotate = function (v, n) {
        this.hand.rotate(v, n);
    };
    return Hand;
}());
exports.Hand = Hand;
