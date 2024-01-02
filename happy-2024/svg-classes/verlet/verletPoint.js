class verletPoint {
  // a simple svg circle
  // stores it’s position, it’s previous position
  // and calculates it’s velocity by subtracting
  // the previous position.
  constructor(args) {
    const newCircle = document.createElementNS(svgNS, 'circle')
    newCircle.setAttribute('cx', args.x)
    newCircle.setAttribute('cy', args.y)
    newCircle.setAttribute('r', args.rad)

    this.html = newCircle
    this.parent = args.parent

    this.x = args.x
    this.y = args.y
    this.oldx = args.oldx
    this.oldy = args.oldy
    this.radius = args.rad || 0
    this.fill = args.fill || 'white'
    this.pinned = false
    this.hidden = args.hidden || false

    this.textGroup = null
    this.textGroupTexts = []
    // eventually <g> with <text> child 

    this.parent.appendChild(newCircle)
    this.setFill(this.fill)
  }

  appendText(txt, yOffset) {
    if (!this.textGroup) { // is <g> there?
      const newG = document.createElementNS(svgNS, 'g')
      this.textGroup = newG
      newG.setAttribute('id', 'new-text')
      this.parent.appendChild(newG)
      // wo ist der 
    }
    const newText = new Text({txt: txt, x: this.x, y: this.y, fill: this.fill, offset: yOffset})
    this.textGroupTexts.push(newText)
    this.textGroup.appendChild(newText.html)
  // ziel: mehrere Texte.
  // könnten mit translateY offset haben
  // oder, alle Textelemente an Sticks aufhängen!?
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
    if (this.textGroupTexts.length) {
      for (const text of this.textGroupTexts) {
        text.setX(newX)
      }
    }
  }

  setY(newY) {
    this.y = newY
    this.html.setAttribute('cy', newY)
    if (this.textGroupTexts.length) {
      for (const text of this.textGroupTexts) {
      text.setY(newY)
      }
    }
  }

  setFill(c) {
    this.html.setAttribute('fill', c)
  }

  pin() {
    this.pinned = true
  }

  unpin() {
    this.pinned = false
  }

  pinToggle() {
    this.pinned = !this.pinned
  }

  setStroke(s) {
    this.html.setAttribute('stroke', s)
  }

  hide() {
    this.hidden = true
    this.html.style.visibility = 'hidden'
  }

  unHide() {
    this.hidden = true
    this.html.style.visibility = 'visible'
  }

  angleTo(p2) {
    // angle to body pulling on particle
    return Math.atan2(p2.y - this.y, p2.x - this.x)
  }
  
  setTextTransform(a, tx, ty) {
    const x = Math.trunc(this.x)
    const y = Math.trunc(this.y)
    const rotate = `rotate(${a}, ${x}, ${y})`
    const translate = `translate(${tx} ${ty})`
    this.textGroup.setAttribute('transform', `${rotate} ${translate}`)
  }

  updateMarkup() {
    this.html.setAttribute('cx', this.x)
    this.html.setAttribute('cy', this.y)
  }
}
