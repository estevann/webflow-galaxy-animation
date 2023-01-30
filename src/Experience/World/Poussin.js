import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Poussin
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
        this.poussin = {}
        this.poussin.group = this.resources.items.poussin.scene
        this.scene.add(this.poussin.group)


        this.poussin.group.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.material = this.room.roomModel.material
            }
        })

        this.hautPoussin = this.poussin.group.getObjectByName('hautPoussin')
        this.basPoussin = this.poussin.group.getObjectByName('milieuPoussin')
    }
    
    update()
    {
        this.hautPoussin.rotation.x = Math.sin(this.time.elapsed * 0.009) * 0.5
        this.basPoussin.rotation.x = -(Math.sin(this.time.elapsed * 0.009) * 0.5)
    }

}