class Circle {
  // ‘particle’ in coding math
  constructor(x, y, rad, speed, direction, gravity, friction) {
    const newCircle = document.createElementNS(svgNS, 'circle')
    newCircle.setAttribute('cx', x)
    newCircle.setAttribute('cy', y)
    newCircle.setAttribute('r', rad)
    newCircle.setAttribute('transform-origin', `${x} ${y}`)

    this.html = newCircle

    this.x = x
    this.y = y
    this.radius = 0 || rad

    this.vx = Math.cos(direction) * speed
    this.vy = Math.sin(direction) * speed
    this.gravity = gravity || 0

    this.bounce = -1
    this.mass = 1
    this.direction = direction || 0
    this.speed = speed || 0
    this.friction = friction || 1
    svg.appendChild(newCircle)
  }

  getRadius() {
    return this.radius
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }

  setX(newX) {
    this.x = newX
    this.html.setAttribute('cx', newX)
  }

  setY(newY) {
    this.y = newY
    this.html.setAttribute('cy', newY)
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
    this.html.setAttribute('cx', this.x)
    this.html.setAttribute('cy', this.y)
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
