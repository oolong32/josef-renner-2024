
const state = {
  angleCorr: 0, // Buchstabenausrichtung
  translateCorr: {x: 0, y: 0}, // Buchstabenhöhe im Verhältnis zu Punkt
  hue: 140
}
const message = 'HAPPY*2024' // ca. 500px
const message2 = 'BYE*2023**'
// 1ch = 50px, spacing = 50, 950px
const pointRad = 3
const stickyThings = []
let szeemann = -Math.trunc(height / 4)
let x = (width - 950) / 2
let xIncrement = 100

for (let char of message) {
  // start setup loop
  let points = []
  let p1 = {
    x: x,
    y: 300,
    rad: pointRad,
    oldx: x,
    oldy: 300,
    fill: null,
    hidden: true,
  }

  let p2 = {
    x: x + 50,
    y: 300,
    rad: pointRad,
    oldx: x + 50,
    oldy: 300,
    fill: null,
    hidden: true,
  }

  let p3 = {
    x: x + 50,
    y: 350,
    rad: pointRad,
    oldx: x + 50,
    oldy: 350,
    fill: null,
    hidden: true,
  }

  let p4 = {
    x: x,
    y: 350,
    rad: pointRad,
    oldx: x,
    oldy: 350,
    fill: null,
    hidden: true,
  }

  let p5 = {
    // hanging sticks
    x: x,
    y: height / 2,
    rad: pointRad,
    oldx: x,
    oldy: height / 2,
    fill: null,
    pinned: true,
  }

  let p6 = {
    x: x + 70,
    y: height / 2 + 10,
    rad: pointRad,
    oldx: x + 100,
    oldy: height / 2 + 50,
    fill: null,
  }

  let p7 = {
    x: x,
    y: height / 2,
    rad: pointRad,
    oldx: x + 200,
    oldy: height / 2 + 50,
    fill: null,
  }

  // pin one point
  p5.pinned = true

  let args = {
    points: [p1, p2, p3, p4, p5, p6, p7],
  }

  let stickyThing = new VerletObject(args)

  let stick1 = { start: stickyThing.points[0], end: stickyThing.points[1] }
  stick1.hidden = true
  let stick2 = { start: stickyThing.points[1], end: stickyThing.points[2] }
  stick2.hidden = true
  let stick3 = { start: stickyThing.points[2], end: stickyThing.points[3] }
  stick3.hidden = true
  let stick4 = { start: stickyThing.points[3], end: stickyThing.points[0] }
  stick4.hidden = true

  stickyThing.points[0].appendText(char)
  stickyThing.points[0].textGroupTexts.forEach((text) => {
    text.html.setAttribute('font-size', 140)
    text.setFill(`hsl(${state.hue} 90% 60%)`)
    text.html.setAttribute('transform', 'translate(-35 80)')
  })

  // diagonal
  let stick5 = {
    start: stickyThing.points[0],
    end: stickyThing.points[2],
    hidden: true,
  }

  // hanging sticks
  let stick6 = { start: stickyThing.points[4], end: stickyThing.points[5] }
  let stick7 = { start: stickyThing.points[5], end: stickyThing.points[6] }
  let stick8 = { start: stickyThing.points[6], end: stickyThing.points[0] }

  stickyThing.addStick(stick1)
  stickyThing.addStick(stick2)
  stickyThing.addStick(stick3)
  stickyThing.addStick(stick4)
  stickyThing.addStick(stick5)
  stickyThing.addStick(stick6)
  stickyThing.addStick(stick7)
  stickyThing.addStick(stick8)

  // set points to hidden
  stickyThing.points.forEach((p) => {
    if (p.hidden) {
      p.hide()
    }
  })

  // add line offset
  stickyThing.sticks.forEach((s) => {
    s.line.setDashArray('1 20')
    s.line.setStroke(`hsl(${state.hue} 90% 60%)`)
    s.line.setStrokeWidth('5')
    s.line.setLinecap('round')
  })

  stickyThings.push(stickyThing)

  stickyThing.html.setAttribute('style', `--szeemann: ${szeemann}px`)

  x += xIncrement // offset for next verletThing
} // end setup-loop

let dashOffset = 0
loop()
function loop() {
  for (const stickyThing of stickyThings) {
    stickyThing.updatePoints()
    for (let i = 0; i <= 3; i += 1) {
      // repeat 3 times to limit skewage
      // the more iterations, the more solid feeling
      stickyThing.updateSticks()
      stickyThing.constrainPoints()
    }
    stickyThing.renderSticks()
    stickyThing.renderPoints()

    // special for text
    // const textPoint = stickyThing.points.find(p=>p.textGroup)
    const pA = stickyThing.points[0] // Point with text
    const pB = stickyThing.points[1]
    const aRadians = pA.angleTo(pB)
    aDegrees = (aRadians * 180) / PI - 45 + state.angleCorr // sollte senkrecht ausgerichtet sein
    pA.setTextTransform(aDegrees, state.translateCorr.x, state.translateCorr.y)

    // dashOffset
    for (stick of stickyThing.sticks) {
      stick.line.setDashOffset(dashOffset)
    }
  }
  dashOffset -= 1

  requestAnimationFrame(loop)
}

document.addEventListener('keydown', (e) => {
  szeemann *= -1
  let text
  const upsideDown = szeemann > 1
  if(upsideDown) {
    text = message2
    state.angleCorr = 180
    state.translateCorr.y = -80
    state.hue = 320
  } else {
    text = message
    state.angleCorr = 0
    state.translateCorr.y = 0
    state.hue = 140
  }
  stickyThings.forEach((thing, i) => {
    thing.flipGravity()
    thing.html.setAttribute('style', `--szeemann: ${szeemann}px`)
    const textElement = thing.points[0].textGroupTexts[0]
    textElement.updateText(text[i])
    textElement.setFill(`hsl(${state.hue} 90% 60%)`)
    thing.sticks.forEach(stick => {
      stick.line.setStroke(`hsl(${state.hue} 90% 60%)`)
    })
  })

  const button = document.querySelector('.button')
  if (button) {
    button.style.opacity = 0
  }
})
