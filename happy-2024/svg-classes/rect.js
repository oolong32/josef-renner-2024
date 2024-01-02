class Rect {
  // ‘particle’ in coding math
  constructor(x, y, w, h, speed, direction, gravity, friction) {
    const newRect = document.createElementNS(svgNS, 'rect')
    newRect.setAttribute('x', x)
    newRect.setAttribute('y', y)
    newRect.setAttribute('width', w) // hard coded for now
    newRect.setAttribute('height', h)
    newRect.setAttribute('transform-origin', `${x+w/2} ${y+h/2}`)

    this.html = newRect

    this.x = x
    this.y = y
    this._width = w
    this._height = h

    this.vx = Math.cos(direction) * speed
    this.vy = Math.sin(direction) * speed
    this.gravity = gravity || 0

    this.bounce = -1
    this.mass = 1
    this.direction = direction || 0
    this.speed = speed || 0
    this.friction = friction || 1
    svg.appendChild(newRect)
  }

  getWidth() {
    return parseInt(this.html.getAttribute('width'))
  }

  getHeight() {
    return parseInt(this.html.getAttribute('height'))
  }

  getX() {
    return parseInt(this.html.getAttribute('x'))
  }

  getY() {
    return parseInt(this.html.getAttribute('y'))
  }

  setX(x) {
    this.x = x
    this.html.setAttribute('x', x)
  }

  setY(y) {
    this.y = y
    this.html.setAttribute('y', y)
  }

  setWidth(w) {
    this._width = w
    this.html.setAttribute('width', w)
  }

  setHeight(h) {
    this._height = h
    this.html.setAttribute('height', h)
  }

  setFill(c) {
    this.html.setAttribute('fill', c)
  }

  setStroke(s) {
    this.html.setAttribute('stroke', s)
  }

  move() {
    this.vx *= this.friction
    this.vy *= this.friction
    this.vy += this.gravity
    this.x += this.vx
    this.y += this.vy
    this.html.setAttribute('x', this.x)
    this.html.setAttribute('y', this.y)
  }

  accelerate(ax, ay) {
    this.vx += ax
    this.vy += ay
  }

  angleTo(p2) {
    // angle to body pulling on particle
    return Math.atan2(p2.y - this.y, p2.x - this.x)
  }

  distanceTo(p2) {
    // returns distance to other particle
    const dx = p2.x - this.x
    const dy = p2.y - this.y
    return Math.sqrt(dx * dx + dy * dy) // Pythagoras
  }

  gravitateTo(p2) {
    const dx = p2.x - this.x
    const dy = p2.y - this.y
    const distSQ = dx * dx + dy * dy
    const dist = Math.sqrt(distSQ)
    const force = p2.mass / distSQ
    const ax = (dx / dist) * force
    const ay = (dy / dist) * force
    this.vx += ax
    this.vy += ay
  }
}
