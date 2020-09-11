const vertexShader = `
    attribute float a_color;
    varying vec4 v_color;

    void main(){
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        v_color = vec4(vec3(a_color), 1);
        // v_color = gl_Position * 0.5 + 0.5;
    }
`

const fragmentShader = `
    varying vec4 v_color;

    void main(){
        gl_FragColor = v_color;
    }
`