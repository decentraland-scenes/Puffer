import { Dialog } from '../node_modules/@dcl/ui-utils/utils/types'
import { inflateFish } from './game'

export let FishTalk: Dialog[] = [
  {
    text: 'Hi there, I’m a puffer fish',
  },
  {
    text: 'I’m all puffy, you know',
  },
  {
    text: 'I must go, my planet needs me',
    isEndOfDialog: true,
  },
]

export let FishTalk2: Dialog[] = [
  {
    text: `Hi there, I’m a puffer fish. Don’t come near.`,
  },
  {
    text: `Don’t come near or I’ll PUFF UP.`,
    fontSize: 30,
    portrait: {
      path: 'images/fish-sprite.png',
      section: { sourceHeight: 256, sourceWidth: 256, sourceLeft: 256 },
    },
  },
  {
    text: `I mean it!!`,
    fontSize: 60,
    portrait: {
      path: 'images/fish-sprite.png',
      section: { sourceHeight: 256, sourceWidth: 256, sourceLeft: 512 },
    },
  },
  {
    text: `What do you come here for? This is my home. What do you want?`,
    isQuestion: true,
    labelE: { label: `Just Chillin` },
    labelF: { label: `Revenge!` },
    ifPressE: 4,
    ifPressF: 5,
    triggeredByF: () => {
      inflateFish()
    },
  },
  {
    text: `Ok, all good then`,
    isEndOfDialog: true,
  },
  {
    text: `Shit just got real!`,
    fontSize: 60,
    isEndOfDialog: true,
  },
]
