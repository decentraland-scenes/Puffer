import * as utils from '@dcl/ecs-scene-utils'
import { ammo, fishHealth, healthBar } from './ui'
import * as ui from '@dcl/ui-scene-utils'

const deflatedScale = new Vector3(0.05, 0.05, 0.065)
const inflatedScale = new Vector3(0.11, 0.11, 0.075)

const puffer = new Entity()

puffer.addComponent(new GLTFShape('models/puffer.gltf'))

puffer.addComponent(
  new Transform({
    position: new Vector3(8, 1, 8),
    scale: deflatedScale
  })
)

let isInflating = false

// sound when deflating
const deflatedSound = new AudioClip('sounds/deflate.wav')
puffer.addComponent(new AudioSource(deflatedSound))

engine.addEntity(puffer)

// Reaction when clicked
puffer.addComponent(
  new OnPointerDown(
    (e) => {
      inflateFish()
      fishHealth.decrease()
      if (fishHealth.read() <= 0) {
        engine.removeEntity(puffer)
      }
    },
    { button: ActionButton.POINTER, hoverText: 'Puff up!' }
  )
)

//trigger when player walks near fish
puffer.addComponent(
  new utils.TriggerComponent(new utils.TriggerSphereShape(2, Vector3.Zero()), {
    onCameraEnter: () => {
      inflateFish()
      ui.displayAnnouncement('Ouch!', 1, Color4.Red(), 60)
      healthBar.decrease(0.2)
      if (healthBar.read() <= 0) {
        new ui.OptionPrompt(
          'You are dead',
          'Do you want to play again?',
          () => {
            engine.addEntity(puffer)
            ammo.set(10)
            healthBar.set(1)
            fishHealth.set(1)
          },
          null,
          'Yes',
          'No',
          true
        )
      }
    }
  })
)

/// Reusable function to inflate fish, called by the click, the trigger, and the dialog
export function inflateFish() {
  if (isInflating) return
  isInflating = true
  puffer.addComponent(
    new utils.ScaleTransformComponent(
      deflatedScale,
      inflatedScale,
      1,
      null,
      utils.InterpolationType.EASEINQUAD
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
