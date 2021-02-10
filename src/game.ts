/// Ground
let ground = new Entity()
engine.addEntity(ground)
ground.addComponent(new GLTFShape('models/FloorBaseDirt_01.glb'))
ground.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
  })
)
