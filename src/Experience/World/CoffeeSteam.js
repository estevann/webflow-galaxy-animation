import * as THREE from 'three'
import Experience from '../Experience.js'
import vertexShader from '../Shaders/CoffeeSteam/coffeeSteam.vs.glsl'
import fragmentShader from '../Shaders/CoffeeSteam/coffeeSteam.fs.glsl'

export default class CoffeeSteam
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.room = this.experience.room
        this.time = this.experience.time

        this.setCoffeeSteam()
    }

    setCoffeeSteam()
    {
        this.coffeeSteamModel = {}

        this.coffeeSteamModel.color = '#ffffff'

        // Material
        this.coffeeSteamModel.material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            vertexShader,
            fragmentShader,
            uniforms:
            {
                uTime: {value: 0},
                uTimeFrequency: {value: 0.0008},
                uUvFrequency: { value: new THREE.Vector2(3, 4) },
                uColor: { value: new THREE.Color(this.coffeeSteamModel.color) }
            }
        })

        // Model
        this.coffeeSteamModel.mesh = this.resources.items.fumee.scene.children[0]
        this.coffeeSteamModel.mesh.material = this.coffeeSteamModel.material
        this.scene.add(this.coffeeSteamModel.mesh)

    }

    update()
    {
        this.coffeeSteamModel.material.uniforms.uTime.value = this.time.elapsed
    }
}