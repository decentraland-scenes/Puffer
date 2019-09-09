import utils from "../node_modules/decentraland-ecs-utils/index"
import { InterpolationType } from "../node_modules/decentraland-ecs-utils/transform/math/interpolation"

let puffer = new Entity()
engine.addEntity(puffer)
puffer.addComponent(new GLTFShape("models/puffer.gltf"))

let pufferTransform = new Transform()
puffer.addComponent(pufferTransform)

let deflatedScale = new Vector3(0.05, 0.05, 0.065)
let inflatedScale = new Vector3(0.11, 0.11, 0.075)

pufferTransform.position.set(8, 1, 8)
pufferTransform.scale = deflatedScale

let isInflating = false

let deflatedSound = new AudioClip("sounds/deflate.wav")
puffer.addComponent(new AudioSource(deflatedSound))

puffer.addComponent(new OnClick(
	e => {
		if (isInflating) return
		isInflating = true
		puffer.addComponent(new utils.ScaleTransformComponent(
			deflatedScale,
			inflatedScale,
			1,
			null,
			InterpolationType.EASEINQUAD
		))
		puffer.addComponent(new utils.Delay(2000,
			() => {
				puffer.getComponent(AudioSource).playOnce()
				puffer.addComponent(new utils.ScaleTransformComponent(
					inflatedScale,
					deflatedScale,
					3,
					() => {
						isInflating = false
					}
				))
			}
		))
	}
))


let ground = new Entity()
engine.addEntity(ground)
ground.addComponent(new GLTFShape("models/FloorBaseDirt_01.glb"))
ground.addComponent(new Transform({
	position: new Vector3(8, 0, 8)
}))