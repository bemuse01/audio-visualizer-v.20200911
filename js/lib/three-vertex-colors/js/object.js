const object = {
    createCircleByVertexColors(scene, group, layer){
        // let sample = new THREE.CircleGeometry(param.circle.size, param.circle.seg)
        // let points = sample.vertices.slice(1, 3).map(e => [e.x, e.y, e.z])
        // let vector = []

        /* for(let i = 0; i < param.circle.seg; i++){
            let deg = 360 / param.circle.seg
            let x = Math.cos(deg * i * radian) * param.circle.size, y = Math.sin(deg * i * radian) * param.circle.size
            vector.push(x, y, 0)
        } */
        let geometry = new THREE.RingBufferGeometry(param.circle.size.inner, param.circle.size.outer, param.circle.seg)
        let noise = object_method.createNoise(geometry)

        /* let position = sample.vertices.map((e, i) => [e.x, e.y, e.z].join()).slice(1) 
        position.push(...points)
        position = position.join().split(',').map(e => parseFloat(e)) */

        let color = object_method.createColor(geometry.attributes.position.array)

        // let geometry = new THREE.BufferGeometry()
        // let vectors = new Float32Array(vector)
        let colors = new Float32Array(color)
        //let positions = new Float32Array(position)

        // geometry.setAttribute('position', new THREE.BufferAttribute(vectors, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        // geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        console.log(geometry)

        let material = new THREE.MeshBasicMaterial({
            vertexColors: colors
        })
        
        let mesh = new THREE.Mesh(geometry, material)
        mesh.rotation.z = 90 * radian
        mesh.vertices = [...geometry.attributes.position.array]
        mesh.layers.set(layer)
        mesh.noise = noise
        console.log(noise)

        group.add(mesh)
        scene.add(group)
    },
    createCircleByShader(scene, group){
        let sample = new THREE.CircleGeometry(10, 128).vertices
        let geometry = new THREE.CircleBufferGeometry(10, 128)
        console.log(geometry)

        let color = sample.map((e, i) => {
            if(i < sample.length / 2) return [109, 247, 247].map(e => e / 255).join()
            else return [249, 111, 250].map(e => e / 255).join()
        }).join().split(',').map(e => parseFloat(e))
        for(let i = 0; i < 1; i++) color.push(109 / 255, 247 / 255, 247 / 255)
        let colors = new Float32Array(color)
        geometry.setAttribute('a_color', new THREE.BufferAttribute(colors, 3))

        let material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            wireframe: true
        })
        let mesh = new THREE.Mesh(geometry, material)
        
        group.add(mesh)
        scene.add(group)
    },
    createCircle(scene, group, layer){
        let geometry = new THREE.RingBufferGeometry(param.circle.size.inner, param.circle.size.outer, param.circle.seg)
        let material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.9
        })
        let mesh = new THREE.Mesh(geometry, material)
        mesh.rotation.z = 90 * radian
        mesh.vertices = [...geometry.attributes.position.array]
        mesh.layers.set(layer)

        console.log(geometry.attributes)

        group.add(mesh)
        scene.add(group)
    }
}