import { Dialog } from '@dcl/npc-scene-utils'
import { inflateFish } from './pufferfish'

export const FishTalk: Dialog[] = [
  {
    text: 'Hi there, I’m a puffer fish'
  },
  {
    text: 'I’m all puffy, you know'
  },
  {
    text: 'I must go, my planet needs me',
    isEndOfDialog: true
  }
]

export const FishTalk2: Dialog[] = [
  {
    text: `Hi there, I’m a puffer fish. Don’t come near.`
  },
  {
    text: `Don’t come near or I’ll PUFF UP.`,
    fontSize: 30,
    portrait: {
      path: 'images/fish-sprite.png',
      section: { sourceHeight: 256, sourceWidth: 256, sourceLeft: 256 }
    }
  },
  {
    text: `I mean it!!`,
    fontSize: 60,
    portrait: {
      path: 'images/fish-sprite.png',
      section: { sourceHeight: 256, sourceWidth: 256, sourceLeft: 512 }
    }
  },
  {
    text: `What do you come here for? This is my home. What do you want?`,
    isQuestion: true,
    buttons: [
      { label: `Just Chillin`, goToDialog: 'ok' },
      {
        label: `Revenge!`,
        goToDialog: 'revenge',
        triggeredActions: () => {
          inflateFish()
        }
      }
    ]
  },
  {
    name: 'ok',
    text: `Ok, all good then`,
    isEndOfDialog: true
  },
  {
    name: 'revenge',
    text: `Shit just got real!`,
    fontSize: 60,
    isEndOfDialog: true
  }
]
