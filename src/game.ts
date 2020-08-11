import utils from '../node_modules/decentraland-ecs-utils/index'
import { InterpolationType } from '../node_modules/decentraland-ecs-utils/transform/math/interpolation'
import { TriggerSphereShape } from '../node_modules/decentraland-ecs-utils/triggers/triggerSystem'

let deflatedScale = new Vector3(0.05, 0.05, 0.065)
let inflatedScale = new Vector3(0.11, 0.11, 0.075)

let puffer = new Entity()

puffer.addComponent(new GLTFShape('models/puffer.gltf'))

puffer.addComponent(
  new Transform({
    position: new Vector3(8, 1, 8),
    scale: deflatedScale,
  })
)

let isInflating = false

// sound when deflating
let deflatedSound = new AudioClip('sounds/deflate.wav')
puffer.addComponent(new AudioSource(deflatedSound))

engine.addEntity(puffer)

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
    new TriggerSphereShape(2, Vector3.Zero()),
    null,
    null,
    null,
    null,
    () => {
      inflateFish()
    }
  )
)

/// Reusable function to inflate fish, called both by the click and the trigger
function inflateFish() {
  if (isInflating) return
  isInflating = true
  puffer.addComponent(
    new utils.ScaleTransformComponent(
      deflatedScale,
      inflatedScale,
      1,
      null,
      InterpolationType.EASEINQUAD
    )
  )
  puffer.addComponent(
    new utils.Delay(2000, () => {
      puffer.getComponent(AudioSource).playOnce()
      puffer.addComponent(
        new utils.ScaleTransformComponent(
          inflatedScale,
          deflatedScale,
          3,
          () => {
            isInflating = false
          }
        )
      )
    })
  )
}

/// Ground
let ground = new Entity()
engine.addEntity(ground)
ground.addComponent(new GLTFShape('models/FloorBaseDirt_01.glb'))
ground.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
  })
)
