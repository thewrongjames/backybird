export class Bird {
  constructor () {
    this.x = 500
    this.y = 200
    this.velocityY = 0
    this.width = 20
    this.height = 20
    this.weight = 1
  }

  /**
   * Update the bird on the given canvas
   * @param {HTMLCanvasElement} canvas
   * @param {number} angle An ever-increasing value to input into Math.sin.
   */
  update (canvas, angle) {
    let curve = Math.sin(angle) * this.height;

    const bottomLimit = canvas.height - (this.height * 3) + curve
    const topLimit = 0 + (this.height * 2) + curve

    if (this.y > bottomLimit) {
      this.y = bottomLimit
      this.velocityY = 0
    } else {
      // Apply gravity.
      this.velocityY += this.weight

      // Not really sure what this represents, but it slows you down a bit and
      // it feels a bit more like flappy bird.
      this.velocityY *= 0.9
      
      this.y += this.velocityY
    }

    if (this.y < topLimit) {
      this.y = topLimit
      this.velocityY = 0
    }
  }

  /**
   * Draw the bird onto the given canvas context.
   * @param {CanvasRenderingContext2D} canvasContext
   */
  draw (canvasContext) {
    canvasContext.fillStyle = 'red'
    canvasContext.fillRect(
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  flap () {
    this.velocityY -= 2
  }
}