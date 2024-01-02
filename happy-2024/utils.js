const utils = {
  norm: function(value, min, max) {
    // where lies value beween min and max (percentile)
    return (value - min) / (max - min)
  },

  lerp: function(norm, min, max) {
    // opposite of normalization
    // find value in range coresponding to norm
    // norm is a value between 0 an 1
    return (max - min) * norm + min
  },

  map: function(value, sourceMin, sourceMax, destMin, destMax) {
    // maps value from one range into another range
    return this.lerp(this.norm(value, sourceMin, sourceMax), destMin, destMax)
  },

  clamp: function(value, min, max) {
    // limits a value so it stays inside a range
    // https://www.youtube.com/watch?v=A-uIFk_uWdw
    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max))
  },

  distance: function(p1, p2) {
    const dx = p1.x - p2.x
    const dy = p1.y - p2.y
    return Math.sqrt(dx*dx + dy*dy)
  },

  distanceXY: function(x0, y0, x1, y1) {
    const dx = x1 - x0
    const dy = y1 - y0
    return Math.sqrt(dx*dx + dy*dy)
  },

  circleCollision: function(c0, c1) { // colliding circles
    return this.distance(c0, c1) <= c0.radius + c1.radius
  },

  pointInCircle: function(x, y, circle) { // point collides with circle
    const cx = circle.x
    const cy = circle.y
    return this.distanceXY(x, y, cx, cy) < circle.getRadius() 
  },

  inRange: function(value, min, max) {
    // fun fact: max can be smaller than min,
    // e.g. on a negative scale
    // thus, be safe and use Math.min() & Math.max()
    return value >= Math.min(min, max) && value <= Math.max(min, max)
  },

  pointInRect: function(x, y, rect) { // point collides with rect
    const rLeft = rect.getX()
    const rRight = rect.getX() + rect.getWidth()
    const rTop = rect.getY()
    const rBottom = rect.getY() + rect.getHeight()
    return this.inRange(x, rLeft, rRight) && this.inRange(y, rTop, rBottom)
  },

  rangeIntersect: function(min0, max0, min1, max1) { // test two ranges for overlap
    // make sure min is min, and max is max
    const minA = Math.min(min0, max0)
    const maxA = Math.max(min0, max0)
    const minB = Math.min(min1, max1)
    const maxB = Math.max(min1, max1)
    return maxA >= minB && minA <= maxB
  },

  rectIntersect: function(rect1, rect2) { // colliding rects
    rect1left = rect1.x
    rect1right = rect1.x + rect1.getWidth()
    rect1top = rect1.y
    rect1bottom = rect1.y + rect1.getHeight()
    rect2left = rect2.x
    rect2right = rect2.x + rect2.getWidth()
    rect2top = rect2.y
    rect2bottom = rect2.y + rect2.getHeight()
    const rangeX_Intersect = this.rangeIntersect(rect1left, rect1right, rect2left, rect2right)
    const rangeY_Intersect = this.rangeIntersect(rect1top, rect1bottom, rect2top, rect2bottom)
    return rangeX_Intersect && rangeY_Intersect
  }
}