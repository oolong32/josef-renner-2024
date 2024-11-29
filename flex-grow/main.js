const w = window.innerWidth
const h = window.innerHeight
const body = document.body
const bodyH = body.offsetHeight
const rootFontSize = getComputedStyle(body).getPropertyValue('font-size')
const m = parseFloat(rootFontSize)
const r = Math.random
const floor = Math.floor
const trunc = Math.trunc

const vFlexUpdateButton = document.querySelector('#v-flex-update')
const hFlexUpdateButton = document.querySelector('#h-flex-update')
const vFlexCenterButton = document.querySelector('#v-flex-center')
const hFlexCenterButton = document.querySelector('#h-flex-center')
const hFlexDistrbButton = document.querySelector('#h-flex-distribute')

const vFlexContainer = document.querySelector('.foo')
const hFlexContainers = document.querySelectorAll('.foo-p')
const hFlexContainersFull = document.querySelectorAll('.foo-p.text')
const hFlexContainersEmpty = document.querySelectorAll('.foo-p.empty')
const vFlexH = vFlexContainer.offsetHeight

// insert spans in hFlex paragraph
// first time
hFlexContainersFull.forEach((flexP) => {
  const txt = flexP.innerText
  // random index: after the first and before the last char
  const len = txt.length
  const randomIndex = 1 + floor(r() * len - 2) // das scheint noch nicht zu funktionieren !❌
  // split arbitrarily, insert spans
  const txtL = txt.slice(0, randomIndex)
  const txtR = txt.slice(randomIndex)
  const spanL = `<span class="text-fragment">${txtL}</span>`
  const spanR = `<span class="text-fragment">${txtR}</span>`
  let spanTxt = `${spanL}<span class="empty"></span>${spanR}`
  // insert empty span at start and end
  spanTxt = `<span class="empty"></span>${spanTxt}<span class="empty"></span>`
  flexP.innerHTML = spanTxt
})

// update vertical Flexbox
vFlexUpdateButton.addEventListener('click', vFlexUpdateHandler)
function vFlexUpdateHandler(e) {
  console.log('click v-flex-ui')
  const whiteSpaceH = document.body.offsetHeight - vFlexH
  const newHeight = vFlexH + r() * whiteSpaceH
  vFlexContainer.style.height = `${newHeight}px`
  // could arguably fill total white space all the time
  // or theight could change slower than flexegrow
  // of vertical empty elements
  // also, empties could/should totally collapse from time to time

  // distribute white-space among empty p
  const numEmpty = hFlexContainersEmpty.length
  hFlexContainersEmpty.forEach((emptyP) => {
    // set transition delay
    const tD = trunc(r() * 1000) / 1000
    emptyP.style.setProperty('--t-delay', `${tD}s`)
    // set flex-grow
    emptyP.style.setProperty('flex-grow', r() * numEmpty)
  })
}

// update horizontal Flexbox
hFlexUpdateButton.addEventListener('click', hFlexUpdateHandler)
function hFlexUpdateHandler(e) {
  console.log('click h-flex-ui')
  hFlexContainersFull.forEach((hFlexP) => {
    const emptySpans = hFlexP.querySelectorAll('.empty')
    const numEmptySpans = emptySpans.length
    emptySpans.forEach((emptySpan) => {
      const tD = trunc(r() * 1000) / 1000 // max. 1s
      emptySpan.style.setProperty('--t-delay', `${tD}s`)
      emptySpan.style.setProperty('flex-grow', r() * numEmptySpans)
    })
  })
}

// center vertically
vFlexCenterButton.addEventListener('click', vFlexCenterHandler)
function vFlexCenterHandler(e) {
  console.log('click v-flex-center')
  hFlexContainersEmpty.forEach((emptyP) => {
    // reset flex-grow
    emptyP.style.setProperty('flex-grow', 0)
  })
}

// center horizontally
hFlexCenterButton.addEventListener('click', hFlexCenterHandler)
function hFlexCenterHandler(e) {
  console.log('click h-flex-center')
  hFlexContainersFull.forEach((hFlexP) => {
    const emptySpans = hFlexP.querySelectorAll('.empty')
    emptySpans.forEach((emptySpan) => {
      emptySpan.style.setProperty('flex-grow', 0)
    })
  })
}
// remove spans in horizontal flexboxes
hFlexDistrbButton.addEventListener('click', hFlexDistrbHandler)
function hFlexDistrbHandler(e) {
  console.log('click h-flex-distribute')
  // interpolate back to center
  hFlexCenterHandler(null)
  // set timeout to 1700 = max delay 1s + transition 700ms
  // remove spans
  setTimeout(1700, () => {
    hFlexContainersFull.forEach((hFlexP) => {
      hFlexP.innerHTML = hFlexP.innerText
    })
  })
}
