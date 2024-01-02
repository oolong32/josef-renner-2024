const height = window.innerHeight
const width = window.innerWidth
const PI = Math.PI
const TAU = Math.PI * 2

const svgNS = 'http://www.w3.org/2000/svg'
const svg = document.createElementNS(svgNS, 'svg')
svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
document.body.appendChild(svg)