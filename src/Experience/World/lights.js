import * as THREE from 'three'
import Experience from '../Experience'

export default class lights
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene

        this.setModel()
    }

    setModel()
    {
        // Models
        this.lightsModel = {}

        this.lightsModel.scene = this.resources.items.lights.scene
        this.scene.add(this.lightsModel.scene)

        // Materials
        this.etagereDroite = this.lightsModel.scene.children[0]
        this.etagereGauche = this.lightsModel.scene.children[1]
        this.fenetre = this.lightsModel.scene.children[2]

        this.etagereDroite.material = new THREE.MeshBasicMaterial({color: 'white'})
        this.etagereGauche.material = new THREE.MeshBasicMaterial({color: 'white'})
        this.fenetre.material = new THREE.MeshBasicMaterial({color: '#FF5E19'})
        
    }
}