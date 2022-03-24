import * as ui from '@dcl/ui-scene-utils'
import { DialogWindow } from '@dcl/npc-scene-utils'
import { FishTalk2 } from './dialog'

export const ammo = new ui.UICounter(10, 0, 80, Color4.Yellow())

Input.instance.subscribe('BUTTON_DOWN', ActionButton.POINTER, false, (e) => {
  if (ammo.read() <= 0) return
  ammo.decrease()
})

const ammoIcon = new ui.MediumIcon('images/harpoon.png', -70, 80)

const ammoLabel = new ui.CornerLabel('Ammo', -50, 140, Color4.Yellow())

export const healthBar = new ui.UIBar(
  0.8,
  -30,
  180,
  Color4.Red(),
  ui.BarStyles.ROUNDSILVER
)

export const fishHealth = new ui.UIBar(
  1,
  -100,
  40,
  Color4.Purple(),
  ui.BarStyles.ROUNDBLACK
)

const prompt = new ui.CustomPrompt(ui.PromptStyles.DARKSLANTED)
prompt.addText('Welcome', 0, 120, Color4.Red(), 30)
prompt.addText('This game contains explicit violence towards fish', 0, 90)
const button = prompt.addButton('StartGame', 0, -70, () => {
  prompt.hide()
  fishDialog.openDialogWindow(FishTalk2, 0)
})
button.grayOut()
prompt.addCheckbox('I unerstand firearms are dangerous', -160, 0, () => {
  button.enable()
})

export const fishDialog = new DialogWindow(
  {
    path: 'images/fish-sprite.png',
    section: { sourceHeight: 256, sourceWidth: 256 }
  },
  true
)
