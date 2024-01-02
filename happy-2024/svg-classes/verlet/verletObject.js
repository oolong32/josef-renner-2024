class VerletObject {
  // https://www.youtube.com/watch?v=pBMivz4rIJY
  // a group of svg circles and lines
  constructor(args) {
    // args: points (arr), sticks (arr)
    const newVerlet = document.createElementNS(svgNS, 'g')
    newVerlet.classList.add('verlet-object')
    svg.appendChild(newVerlet)
    this.html = newVerlet

    this.points = []
    this.sticks = [] // needs to be set from outside?

    // initialize points
    for (const point of args.points) {
      const pArgs = { ...point, parent: newVerlet }
      const newPoint = new verletPoint(pArgs)
      if (point.pinned) {
        // point not allowed to move
        newPoint.pin()
      }
      this.points.push(newPoint)
    }

    // modificators
    this.bounce = 0.9
    this.gravity = 0.5
    this.friction = 0.99
  }

  addStick(stick) {
    // stick.start & stick.end ∈ this.points
    const newStick = {
      start: stick.start,
      end: stick.end,
      length: utils.distance(stick.start, stick.end),
      line: new Line(stick.start, stick.end),
      hidden: stick.hidden || true,
    }
    newStick.line.html.remove()
    newStick.line.setStroke('white')
    this.html.prepend(newStick.line.html)
    if (stick.hidden) {
      newStick.line.html.style.visibility = 'hidden'
    }
    this.sticks.push(newStick)
  }

  updatePoints() {
    for (const point of this.points) {
      if (!point.pinned) {
        const vx = (point.x - point.oldx) * this.friction
        const vy = (point.y - point.oldy) * this.friction
        point.oldx = point.getX()
        point.oldy = point.getY()
        point.setX(point.x + vx)
        point.setY(point.y + vy)
        point.setY(point.y + this.gravity)
      }
    }
  }

  constrainPoints() {
    // edge handling must be done after stick updating
    // otherwise points get pushed outside of boundaries
    // when sticks are updated
    // https://youtu.be/pBMivz4rIJY?si=9RSSa7Zfo4jUzvob&t=545
    for (const point of this.points) {
      if (!point.pinned) {
        // probably unnenccessary, but avoids unneccessary math as well
        const vx = (point.x - point.oldx) * this.friction
        const vy = (point.y - point.oldy) * this.friction

        // edge handling
        if (point.x + point.radius > width) {
          point.x = width - point.radius
          point.oldx = point.x + vx * this.bounce // flip to other side
        } else if (point.x - point.radius < 0) {
          point.x = point.radius
          point.oldx = point.x + vx * this.bounce // flip to other side
        }
        if (point.y + point.radius > height) {
          point.y = height - point.radius
          point.oldy = point.y + vy * this.bounce
        } else if (point.y - point.radius < 0) {
          point.y = point.radius
          point.oldy = point.y + vy * this.bounce
        }
      }
    }
  }

  updateSticks() {
    for (const stick of this.sticks) {
      const start = stick.start
      const end = stick.end
      const length = stick.length

      const dx = end.x - start.x
      const dy = end.y - start.y

      // const distance = Math.sqrt(dx*dx + dy*dy)
      const distance = utils.distance(start, end)
      const difference = length - distance
      const percent = difference / distance / 2

      const offsetX = dx * percent
      const offsetY = dy * percent

      if (!start.pinned) {
        start.x -= offsetX
        start.y -= offsetY
      } else {
        // complete offset goes to end
        end.x += offsetX
        end.y += offsetY
      }
      if (!end.pinned) {
        end.x += offsetX
        end.y += offsetY
      } else {
        // complete offset goes to start
        start.x -= offsetX
        start.y -= offsetY
      }
    }
  }
  renderPoints() {
    for (const point of this.points) {
      point.updateMarkup()
    }
  }
  renderSticks() {
    for (const stick of this.sticks) {
      stick.line.setPoints(stick.start, stick.end)
    }
  }
  flipGravity() {
    this.gravity = this.gravity * -1
  }
}
