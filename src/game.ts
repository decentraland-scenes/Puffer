import utils from '../node_modules/decentraland-ecs-utils/index'

/// Ground
let ground = new Entity()
ground.addComponent(new GLTFShape('models/FloorBaseDirt_01.glb'))
ground.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
  })
)
engine.addEntity(ground)

// Reference scale values
let deflatedScale = new Vector3(0.05, 0.05, 0.065)
let inflatedScale = new Vector3(0.11, 0.11, 0.075)

// Create fish
let puffer = new Entity()
puffer.addComponent(new GLTFShape('models/puffer.gltf'))
puffer.addComponent(
  new Transform({
    position: new Vector3(8, 1, 8),
    scale: deflatedScale,
  })
)
engine.addEntity(puffer)

// sound when deflating
let deflatedSound = new AudioClip('sounds/deflate.wav')
puffer.addComponent(new AudioSource(deflatedSound))

// Reaction when clicked
puffer.addComponent(
  new OnPointerDown(
    (e) => {
      inflateFish()
    },
    { button: ActionButton.POINTER, hoverText: 'Puff up!' }
  )
)

// trigger when player walks near fish
puffer.addComponent(
  new utils.TriggerComponent(
    new utils.TriggerSphereShape(2, Vector3.Zero()),
    null,
    null,
    null,
    null,
    () => {
      inflateFish()
    }
  )
)

// Flag to avoid re-triggering
let isInflating = false

/// Reusable function to inflate fish, called both by the click and the trigger
function inflateFish() {
  // Avoid retriggering
  if (isInflating) return
  isInflating = true
  
  // Enlarge
  puffer.addComponent(
    new utils.ScaleTransformComponent(
      deflatedScale,
      inflatedScale,
      1,
      null,
      utils.InterpolationType.EASEINQUAD
    )
  )
  
  // Wait, then shrink back
  puffer.addComponent(
    new utils.Delay(2000, () => {
      puffer.getComponent(AudioSource).playOnce()
      puffer.addComponent(
        new utils.ScaleTransformComponent(
          inflatedScale,
          deflatedScale,
          3,
          () => {
            // When finished, reset flag to allow triggering again
            isInflating = false
          }
        )
      )
    })
  )
}
