import utils from '../node_modules/decentraland-ecs-utils/index'
import { InterpolationType } from '../node_modules/decentraland-ecs-utils/transform/math/interpolation'
import { TriggerSphereShape } from '../node_modules/decentraland-ecs-utils/triggers/triggerSystem'
import * as ui from '../node_modules/@dcl/ui-utils/index'
import {
  BarStyles,
  PromptStyles,
} from '../node_modules/@dcl/ui-utils/utils/types'
import { FishTalk, FishTalk2 } from './dialog'

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
      fishHealth.decrease()
      if (fishHealth.read() <= 0) {
        engine.removeEntity(puffer)
      }
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
      ui.displayAnnouncement('Ouch!', 1, true, Color4.Red(), 60)
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
  )
)

/// Reusable function to inflate fish, called both by the click and the trigger
export function inflateFish() {
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

let ammo = new ui.UICounter(10, 0, 80, Color4.Yellow())

Input.instance.subscribe('BUTTON_DOWN', ActionButton.POINTER, false, (e) => {
  if (ammo.read() <= 0) return
  ammo.decrease()
})

let ammoIcon = new ui.MediumIcon('images/harpoon.png', -70, 80)

let ammoLabel = new ui.CornerLabel('Ammo', -50, 140, Color4.Yellow())

let healthBar = new ui.UIBar(0.8, -30, 180, Color4.Red(), BarStyles.ROUNDSILVER)

let fishHealth = new ui.UIBar(
  1,
  -100,
  40,
  Color4.Purple(),
  BarStyles.ROUNDBLACK
)

let prompt = new ui.CustomPrompt(PromptStyles.DARKSLANTED)
prompt.addText('Welcome', 0, 120, Color4.Red(), 30)
prompt.addText('This game contains explicit violence towards fish', 0, 90)
let button = prompt.addButton('StartGame', 0, -70, () => {
  prompt.close()
  fishDialog.openDialogWindow(FishTalk2, 0)
})
button.grayOut()
prompt.addCheckbox('I unerstand firearms are dangerous', -160, 0, () => {
  button.enable()
})

let fishDialog = new ui.DialogWindow(
  {
    path: 'images/fish-sprite.png',
    section: { sourceHeight: 256, sourceWidth: 256 },
  },
  true
)
