const move = {
    moveCircle(group, dataArray, dataArrayIndex){
        group.forEach(children => {
            let e = children.geometry.attributes.position.array, half = e.length / 3 / 2
            let v = children.vertices
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