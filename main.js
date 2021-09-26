import { Bird } from './bird.js'
import { Obstacle, OBSTACLE_WIDTH } from './obstacle.js'

/**
 * The game canvas HTML element.
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('backybird-canvas')

const context = canvas.getContext('2d')

canvas.width = 600
canvas.height = 400

let activated = false
let angle = 0
let frame = 0
let gameSpeed = 2

const bird = new Bird()
/**
 * An array to store our obstacles in.
 * @type {Array<Obstacle>}
 */
let obstacles = []

// Handle space pressing.
window.addEventListener('keydown', event => {
  if (event.code === 'Space') activated = true
})
window.addEventListener('keyup', event => {
  if (event.code === 'Space') activated = false
})
canvas.addEventListener('mousedown', event => {
  activated = true
})
canvas.addEventListener('mouseup', event => {
  activated = false
})
canvas.addEventListener('touchstart', event => {
  activated = true
})
canvas.addEventListener('touchend', event => {
  activated = false
})

function handleObstacles () {
  // Periodically add new obstacles.
  if (frame % 100 === 0) {
    obstacles.unshift(new Obstacle(canvas))
  }

  // Don't let the array get too long. This could be done more precisely, but,
  // I can't be bothered.
  if (obstacles.length > 20) obstacles.pop()

  for (const obstacle of obstacles) {
    obstacle.update(gameSpeed)
    obstacle.draw(canvas)
  }
}

/**
 * Return whether or not there is currently a collision.
 * @returns {boolean}
 */
function handleCollision () {
  for (const obstacle of obstacles) {
    if (
      bird.x < obstacle.x + OBSTACLE_WIDTH &&
      bird.x + bird.width > obstacle.x &&
      (
        (bird.y < 0 + obstacle.top && bird.y + bird.height > 0) ||
        (
          bird.y > canvas.height - obstacle.bottom &&
          bird.y + bird.height < canvas.height
        )
      )
    ) {
      return true
    }
  }

  return false
}

/**
 * A function that runs every frame update.
 */
function update () {
  // Clear the canvas.
  context.clearRect(0, 0, canvas.width, canvas.height)
  
  if (activated) bird.flap()    

  // Draw the player.
  bird.update(canvas, angle)
  bird.draw(context)

  // Nice wobble speed.
  angle += 0.2

  handleObstacles()

  if (handleCollision()) return

  // Update the frame.
  frame++

  // Recur forever.
  requestAnimationFrame(update)
}

// Start animating.
update()