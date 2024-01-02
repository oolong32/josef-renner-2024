class Path {
  // ‘ship’ in coding math
  constructor(
    points,
    angle,
    transformOrigin,
    speed,
    direction,
    gravity,
    friction
  ) {
    this.d = ''
    for (const [index, point] of points.entries()) {
      if (index == 0) {
        this.d += `M ${point.x} ${point.y} `
      } else {
        this.d += `L  ${point.x} ${point.y} `
      }
      if (index == points.length - 1) {
        this.d += 'Z' // close path
      }
    }
    const newPath = document.createElementNS(svgNS, 'path')
    newPath.setAttribute('d', this.d)
    newPath.setAttribute('fill', 'red')

    this.html = newPath

    this.points = points
    this.translation = { x: 0, y: 0 }

    this.vx = Math.cos(direction) * speed
    this.vy = Math.sin(direction) * speed
    this.gravity = gravity || 0

    this.angle = angle
    this.transformOrigin = transformOrigin || { x: points[0].x, y: points[0].y }
    this.updateOrigin(this.transformOrigin.x, this.transformOrigin.y)
    this.direction = direction || 0
    this.speed = speed || 0
    this.friction = friction || 1

    svg.appendChild(newPath)
  }

  updateOrigin(x, y) {
    this.html.setAttribute('transform-origin', `${x} ${y}`)
  }

  setPoints(points) {
    this.d = ''
    for (const [index, point] of points.entries()) {
      if (index == 0) {
        this.d += `M ${point.x} ${point.y} `
      } else {
        this.d += `L  ${point.x} ${point.y} `
      }
      if (index == points.length - 1) {
        this.d += 'Z' // close path
      }
    }
    this.html.setAttribute('d', this.d)
    this.points = points
  }

  getAngle() {
    return parseFloat(this.angle)
  }

  setAngle(a) {
    this.angle = a % (Math.PI * 2)
  }

  setFill(c) {
    this.html.setAttribute('fill', c)
  }

  setStroke(s) {
    this.html.setAttribute('stroke', s)
  }

  move() {
    // moving all points in a path is awful
    // transform seems good enough for the time being
    this.vx *= this.friction
    this.vy *= this.friction
    this.vy += this.gravity

    this.translation.x += this.vx
    this.translation.y += this.vy

    const x = Math.trunc(this.translation.x)
    const y = Math.trunc(this.translation.y)
    const translateString = `translate(${x} ${y})`

    const a = ((this.angle - Math.PI / 2) * 180) / Math.PI
    const tx = this.transformOrigin.x
    const ty = this.transformOrigin.y
    const rotateString = `rotate(${a})`
    // beware: stupid discrepancy between vector-angle and transform-angle
    // ev. muss hinter rotate noch drehpunkt angegeben werden und zu transform-origin dazugezählt werden?
    this.html.setAttribute('transform', `${translateString} ${rotateString}`)
  }

  accelerate(ax, ay) {
    this.vx += ax
    this.vy += ay
  }
}
