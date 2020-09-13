const move = {
    moveCircle(group, dataArray, dataArrayIndex, wrap, time){
        let sum = dataArray.reduce((x, y) => x + y, 0) / dataArray.length / (255 * 1)
        wrap.scale.set(1 + sum, 1 + sum, 1)
        let n = group[0].noise
        // wrap.rotation.z += 0.005
        
        group.forEach(children => {
            let e = children.geometry.attributes.position.array, half = e.length / 3 / 2
            let v = children.vertices
            let boost = 3, smooth = 8, rf = 0.000001

            for(let i = 0; i < e.length / 3; i++){
                let data = dataArray[dataArrayIndex[i % half]] / 255
                let index = i * 3
                let direction = i * 3 % 2 === 0 ? 1 : 1
                let noise = simplex.noise3D(v[index] / smooth, v[index + 1] / smooth, data * rf * time)
                noise = (noise + 1) / 2

                if(i >= half){
                    e[index] = v[index] + (v[index] * data / boost)
                    e[index + 1] = v[index + 1] + (v[index + 1] * data / boost)
                    // e[index + 2] = v[index + 2] + (v[index + 2] * data / boost) * direction
                }
            }
            /* for(let i = 0; i < e.length / 3; i++){
                let data = dataArray[dataArrayIndex[i % half]] / 255
                let index = i * 3
                let noise = simplex.noise3D(v[index] / smooth, v[index + 1] / smooth, rf * time)
                noise = ((noise + 1) / 2) * 3

                if(i >= half){
                    e[index] = v[index] + (v[index] * sum / boost) * noise // * n[i % half]
                    e[index + 1] = v[index + 1] + (v[index + 1] * sum / boost) * noise // * n[i % half]
                }
            } */

            children.geometry.attributes.position.needsUpdate = true
        })

        /* let e = group.geometry.attributes.position.array, half = e.length / 3 / 2
        let v = group.vertices
        let boost = 2

        for(let i = 0; i < e.length / 3; i++){
            let data = dataArray[dataArrayIndex[i % half]] / 255
            let index = i * 3
            let direction = i * 3 % 2 === 0 ? 1 : 1 

            if(i >= half){
                e[index] = v[index] + (v[index] * data / boost) * direction 
                e[index + 1] = v[index + 1] + (v[index + 1] * data / boost) * direction
                e[index + 2] = v[index + 2] + (v[index + 2] * data / boost) * direction
            }
        }

        group.geometry.attributes.position.needsUpdate = true */
    }
}