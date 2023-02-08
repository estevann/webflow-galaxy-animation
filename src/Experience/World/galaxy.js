import * as THREE from 'three'
import Experience from '../Experience'
import galaxyVertexShader from '../Shaders/Galaxy/galaxy.vs.glsl'
import galaxyFragmentShader from '../Shaders/Galaxy/galaxy.fs.glsl'
import { Color } from 'three'

export default class galaxy
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();

        this.setModel()
        this.setInteractions()
    }

    setModel()
    {
        // Galaxy

        this.parameters = {}
        this.parameters.count = 30000
        this.parameters.size = 15.5
        this.parameters.radius = 1.1
        this.parameters.branches = 7
        this.parameters.spin = 2.1
        this.parameters.randomness = 0.5
        this.parameters.randomnessPower = 50
        this.parameters.insideColor = '#4572d4'
        this.parameters.outsideColor = '#71067A'

        this.geometry = null
        this.material = null
        this.points = null

        const generateGalaxy = () =>
        {
            if(this.points !== null)
            {
                this.geometry.dispose()
                this.material.dispose()
                this.scene.remove(this.points)
            }

            /**
             * Geometry
             */
            this.geometry = new THREE.BufferGeometry()

            const positions = new Float32Array(this.parameters.count * 3)
            const colors = new Float32Array(this.parameters.count * 3)
            const scales = new Float32Array(this.parameters.count * 1)
            const randomness = new Float32Array(this.parameters.count * 3)

            const insideColor = new THREE.Color(this.parameters.insideColor)
            const outsideColor = new THREE.Color(this.parameters.outsideColor)

            for(let i = 0; i < this.parameters.count; i++)
            {
                const i3 = i * 3

                // Position
                const radius = Math.random() * this.parameters.radius

                const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2

                positions[i3    ] = Math.cos(branchAngle) * radius
                positions[i3 + 1] = 0
                positions[i3 + 2] = Math.sin(branchAngle) * radius

                // Randomness

                const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
                const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
                const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius

                randomness[i3 + 0] = randomX    
                randomness[i3 + 1] = randomY
                randomness[i3 + 2] = randomZ    

                // Color
                const mixedColor = insideColor.clone()
                mixedColor.lerp(outsideColor, radius / this.parameters.radius)

                colors[i3    ] = mixedColor.r
                colors[i3 + 1] = mixedColor.g
                colors[i3 + 2] = mixedColor.b

                // Scales

                scales[i] = Math.random()
            }

            this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
            this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
            this.geometry.setAttribute('aScale', new THREE.BufferAttribute(colors, 1))
            this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))

            /**
             * Material
             */
            this.material = new THREE.ShaderMaterial({
                vertexShader: galaxyVertexShader,
                fragmentShader: galaxyFragmentShader,
                uniforms: {
                    uTime: {value: 0},
                    uSize: {value: 60}
                },
                side: THREE.DoubleSide,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true
            })

            /**
             * Points
             */
            this.points = new THREE.Points(this.geometry, this.material)
            this.points.position.set(0, 0, 0)
            this.points.rotation.x = 0
            this.points.rotation.y = 0
            this.points.rotation.z = 1
            this.scene.add(this.points)
        }
        
        generateGalaxy()
    }

    setInteractions()
    {


        window.addEventListener('mousemove', (event) => {
            this.pointer.x = event.clientX / this.sizes.width - 0.5
            this.pointer.y = event.clientY / this.sizes.height - 0.5
        })





    
    // render() {
    
    //     // update the picking ray with the camera and pointer position
    //     raycaster.setFromCamera( pointer, camera );
    
    //     // calculate objects intersecting the picking ray
    //     this.intersects = raycaster.intersectObjects( scene.children );
    
    //     for ( let i = 0; i < intersects.length; i ++ ) {
    
    //         intersects[ i ].object.material.color.set( 0xff0000 );
    
    //     }

    }

    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsed * 0.0001
        this.experience.webflow.webflowModel.group.rotation.y = this.time.elapsed * 0.001
        this.experience.webflow.webflowModel.group.rotation.x = this.time.elapsed * 0.001
        this.experience.webflow.webflowModel.group.rotation.z = this.time.elapsed * 0.001


        this.raycaster.setFromCamera(this.pointer, this.camera.instance)

        this.intersects = this.raycaster.intersectObjects(this.experience.webflow.webflowModel.group.children)



        if ( this.intersects.length > 0) {
            this.material.uniforms.uTime.value = - this.time.elapsed / 0.016
        }

    }
}