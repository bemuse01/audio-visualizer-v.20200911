const util = {
    createDataArrayIndex(group){
        let len = group.geometry.attributes.position.array.length / 3 / 2, arr = []
        for(let i = 0; i < len / 2; i++) arr[i] = i + 32
        return [...arr, ...arr.reverse()] 
    }
}