export const OBSTACLE_WIDTH = 40

export class Obstacle {
  /**
   * Create obstacles for a given canvas.
   * @param {HTMLCanvasElement} canvas 
   */
  constructor (canvas) {
    this.top = (Math.random() * canvas.height / 3) + OBSTACLE_WIDTH
    this.bottom = (Math.random() * canvas.height / 3) + OBSTACLE_WIDTH
    this.x = 0 - OBSTACLE_WIDTH
  }

  /**
   * Draw the obstacle onto the given canvas.
   * @param {HTMLCanvasElement} canvas
   */
   draw (canvas) {
    const canvasContext = canvas.getContext('2d')

    canvasContext.fillStyle = 'green'
    canvasContext.fillRect(this.x, 0, OBSTACLE_WIDTH, this.top)
    canvasContext.fillRect(
      this.x,
      canvas.height - this.bottom,
      OBSTACLE_WIDTH,
      this.bottom
    )
  }

  /**
   * Move the obstacles along, based on the speed of the game.
   * @param {number} gameSpeed 
   */
  update (gameSpeed) {
    this.x += gameSpeed
  }
}