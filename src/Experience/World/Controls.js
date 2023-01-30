import * as THREE from 'three'
import Experience from "../Experience"
import {gsap} from 'gsap'
import loaderVertexShader from '../Shaders/Loader/loader.vs.glsl'
import loaderFragmentShader from '../Shaders/Loader/loader.fs.glsl'



export default class Controls
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.camera = this.experience.camera


        this.replacementCurve = new THREE.Vector3(0, 0, 0)
        this.lookAt = new THREE.Vector3(0, 0, 0)
        this.lookAtEnding = new THREE.Vector3(-2, 3, 0)
        this.progress = 0
        gsap.utils.clamp(0, 0.99, this.progress)

        this.fade()
        this.setPath()

    }

    fade()
    {
        // this.overlayGeometry = new THREE.PlaneGeometry(this.sizes.width, this.sizes.height)
        // this.overlayMaterial = new THREE.ShaderMaterial({
        //     vertexShader: loaderVertexShader,
        //     fragmentShader: loaderFragmentShader
        // })
        // this.overlay = new THREE.Mesh(this.overlayGeometry, this.overlayMaterial)
        // this.scene.add(this.overlay)
    }

    setPath()
    {


    // Créer chemin

    this.pathCamera = new THREE.CatmullRomCurve3( [
        new THREE.Vector3( -1.5, 3.5, -22.5 ),
        new THREE.Vector3( -1.5, 3.5, -20.5 ),
        new THREE.Vector3( -1.6, 2.85, -20 ),
        // new THREE.Vector3( -1.5, 4.5, -15 ),
        // new THREE.Vector3( 0, 2.5, -15 ),
        new THREE.Vector3( -1, 3.5, -2 ),
        // new THREE.Vector3( , 4.2, -3.2 ),
        new THREE.Vector3( 2.8, 5.5, 7 )
        ] );

    this.pathPoints = this.pathCamera.getPoints( 50 );
    this.geometry = new THREE.BufferGeometry().setFromPoints( this.pathPoints );
    this.pathMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
    this.pathObject = new THREE.Line( this.geometry, this.pathMaterial );
    this.scene.add(this.pathObject)

    }



    update()
    {  

        if(this.progress < 0.105)
        {
            this.progress += 0.00038
            this.pathCamera.getPointAt(this.progress + 0.000001, this.replacementCurve)
            this.pathCamera.getPointAt(this.progress, this.lookAt)

            this.camera.instance.position.copy(this.replacementCurve)
            this.camera.instance.lookAt(this.lookAt)
            this.camera.controls.target.copy(this.lookAt)
            this.camera.controls.enabled = false

        } else if(this.progress >= 0.105 & this.progress < 0.98) {

            this.progress += 0.013
            this.pathCamera.getPointAt(this.progress + 0.000001, this.replacementCurve)
            this.pathCamera.getPointAt(this.progress, this.lookAt)

            this.camera.instance.position.copy(this.replacementCurve)
            this.camera.instance.lookAt(this.lookAt)
            this.camera.controls.target.copy(this.lookAt)
            this.camera.controls.enabled = false
            

        } else if(this.progress >= 0.98) {
            gsap.to(this.camera.controls.target, {x:0.4, y: 2.5, z: 0.5, duration: 6.5})
            return this.camera.controls.enabled = true
        }
        


    }
}