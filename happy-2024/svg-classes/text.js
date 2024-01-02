class Text {
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/tspan
  constructor(args) {
    // args = {x, y, txt, fill}
    const newText = document.createElementNS(svgNS, 'text')
    newText.setAttribute('x', args.x)
    newText.setAttribute('y', args.y)
    const offset = args.offset || 0
    newText.setAttribute('transform', `translate(0 ${offset})`)
    // wie geht das in svg?
    const textNode = document.createTextNode(args.txt)
    newText.appendChild(textNode)
    svg.appendChild(newText)

    this.html = newText 

    this.x = args.x || 0
    this.y = args.y || 0
    this.offset = args.offset || 0
    this.txt = args.txt || ''
    this.fill = args.fill || 'black'

    this.setFill(this.fill)
  }

  updateText(txt) {
    const textNode = document.createTextNode(txt)
    // remove current child
    const currentText = this.html.firstChild
    currentText.remove()
    this.html.appendChild(textNode)
  }

  setX(newX) {
    this.x = newX
    this.html.setAttribute('x', newX)
  }
  setY(newY) {
    this.y = newY
    this.html.setAttribute('y', newY)
  }

  setFill(c) {
    this.html.setAttribute('fill', c)
    this.fill = c
  }
}