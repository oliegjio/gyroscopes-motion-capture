import * as T from 'three'

export let point = (x: number, y: number, z: number): T.Vector3 => {
    return new T.Vector3(x, y, z)
}

export let line = (from: T.Vector3, to: T.Vector3): T.Line3 => {
    return new T.Line3(from, to)
}

export let face = (a: number, b: number, c:number): T.Face3 => {
    return new T.Face3(a, b,c )
}

export const NL = {
    x: line(point(0, 0, 0), point(1, 0, 0)),
    y: line(point(0, 0, 0), point(0, 1, 0)),
    z: line(point(0, 0, 0), point(0, 0, 1))
}

export const N = {
    x: point(1, 0, 0),
    y: point(0, 1, 0),
    z: point(0, 0, 1)
}

export let lineDirectingVector = (line: T.Line3): T.Vector3 => {
    return new T.Vector3(line.end.x - line.start.x, line.end.y - line.start.y, line.end.z - line.start.z)
}

export let linesAngle = (line1: T.Line3, line2: T.Line3): number => {
    let vec1 = lineDirectingVector(line1)
    let vec2 = lineDirectingVector(line2)
    let top = Math.abs(vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z)
    let first = Math.sqrt(vec1.x ^ 2 + vec1.y ^ 2 + vec1.z ^ 2)
    let second = Math.sqrt(vec2.x ^ 2 + vec2.y ^ 2 + vec2.z ^ 2)
    let bottom = first * second
    return Math.acos(top / bottom)
}

export let middlePoint = (point1: T.Vector3, point2: T.Vector3) => {
    let x = (point1.x + point2.x) / 2
    let y = (point1.y + point2.y) / 2
    let z = (point1.z + point2.z) / 2
    return point(x, y, z)
}