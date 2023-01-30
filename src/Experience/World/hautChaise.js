import * as THREE from 'three'
import Experience from '../Experience.js'

export default class HautChaise
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.room = this.experience.room
        this.time = this.experience.time

        this.setModel()

    }

    setModel()
    {
        this.hautChaiseModel = {}
        this.hautChaiseModel.group = this.resources.items.hautChaise.scene.children[0]
        this.scene.add(this.hautChaiseModel.group)


        this.hautChaiseModel.group.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.material = this.room.roomModel.material
            }
        })
    }
    
    update()
    {
        this.hautChaiseModel.group.rotation.y =  Math.sin(this.time.elapsed * 0.001) * 0.5 - 0.15
    }

}