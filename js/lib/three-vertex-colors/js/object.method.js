const object_method = {
    createColor(sample){
        let arr = [], temp = this.createColorMap(sample.length / 2 / 3), color = [[109, 247, 247], [120, 122, 245],[249, 111, 250]].map(e => e.map(e => e / 255))
        temp.forEach(e => {
            if(e === 0) arr.push(...color[0])
            else if(e === 1) arr.push(...color[1])
            else arr.push(...color[2])
        })
        return arr
    },
    createColorMap(len){
        let half = Math.floor(len / 2)

        let temp = [], div = {f: Math.floor(half * 0.35), s: Math.floor(half * 0.8)}
        for(let i = 0; i < half; i++){
            if(i < div.f && i >= 0) temp.push(0)
            else if(i < div.s && i >= div.f) temp.push(1)
            else temp.push(2)
        }
        let result = [...temp, ...temp.reverse()]
        return [...result, ...result]
    },
    createNoise(sample){
        let array = sample.attributes.position.array, temp = [], smooth = 10, rf = 0.0001
        for(let i = 0; i < array.length / 2 / 3; i++){
            temp[i] = simplex.noise3D(array[i * 3] / smooth, array[i * 3 + 1] / smooth, i * rf)
        }
        return temp.map(e => ((e + 1) / 2) * 2)
    }
}