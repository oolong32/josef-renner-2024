class Vector {
  constructor(x, y) {
    this._x = x
    this._y = y
  }
  setX(value) {
    this._x = value
  }
  getX() {
    return this._x
  }
  setY(value) {
    this._y = value
  }
  getY() {
    return this._y
  }
  setAngle(angle) {
    const length = this.getLength()
    this.setX(Math.cos(angle) * length)
    this.setY(Math.sin(angle) * length) 
  }
  getAngle() {
    // note to myself: atan2 returns RADIANS, of course
    return Math.atan2(this._y, this._x)
  }
  setLength(length) {
    const angle = this.getAngle()
    this.setX(Math.cos(angle) * length)
    this.setY(Math.sin(angle) * length) 
  }
  getLength() {
    return Math.sqrt(this._x * this._x + this._y * this._y)
  }
  add(v2) {
    return new Vector(this._x + v2._x, this._y + v2._y)
  }
  subtract(v2) {
    return new Vector(this._x - v2._x, this._y - v2._y)
  }
  multiply(value) {
    return new Vector(this._x * value, this._y * value)
  }
  divide(value) {
    return new Vector(this._x / value, this._y / value)
  }
  addTo(v2) {
    this.setX(this._x + v2._x)
    this.setY(this._y + v2._y)
  }
  subtractFrom(v2) {
    this.setX(this._x - v2._x)
    this.setY(this._y - v2._y)
  }
  multiplyBy(value) {
    this.setX(this._x * value)
    this.setY(this._y * value)
  }
  divideBy(value) {
    this.setX(this._x / value)
    this.setY(this._y / value)
  }
}
