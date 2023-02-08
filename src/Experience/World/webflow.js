import * as THREE from 'three'
import Experience from '../Experience.js'
import galaxy from './galaxy.js'

export default class webflow
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        
        this.resources.on('ready', () =>
        {
            // Setup
            this.setWebflow()
            this.setGalaxy()
        })
    }

    setWebflow()
    {
        this.webflowModel = {}
        this.webflowModel.group = this.resources.items.webflow.scene

        this.webflowModel.texture = this.resources.items.logoBaked
        this.webflowModel.texture.encoding = THREE.sRGBEncoding
        this.webflowModel.texture.flipY = false

        this.webflowLogo = this.resources.items.webflow.scene.children[1]
        this.webflowSupport = this.resources.items.webflow.scene.children[0]

        this.webflowSupport.material = new THREE.MeshBasicMaterial({
            map: this.webflowModel.texture
        })

        this.webflowModel.group.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                this.webflowSupport.material = this.webflowSupport.material
                this.webflowLogo.material = new THREE.MeshBasicMaterial({color:'white'})
            }
        })

        this.webflowModel.group.scale.set(1.2, 1.2, 1.2)
        this.scene.add(this.webflowModel.group)

    }

    setGalaxy()
    {
        this.galaxy = new galaxy()
    }

    update()
    {
        if(this.galaxy)
        this.galaxy.update()
    }
}