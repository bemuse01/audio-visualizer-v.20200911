const clock = new THREE.Clock()
const radian = Math.PI / 180
const ratio = window.devicePixelRatio
const post = 0, nomral = 1
const simplex = new SimplexNoise()

const param = {
    circle: {
        size: {
            inner: 8,
            outer: 8 + 0.1
        },
        seg: 599
    }
}

const group = {
    circle: {
        main: new THREE.Group(),
        sub: new THREE.Group()
    }
}

let width, height, renderer, scene, camera, composer
let audio, analyser, dataArray, dataArrayIndex

width = window.innerWidth
height = window.innerHeight

init()
function init(){
    scene = new THREE.Scene()
    
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: canvas})
    renderer.setPixelRatio(ratio)
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000)
    renderer.setClearAlpha(0.0)

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
    camera.position.z = 50
    scene.add(camera)
    
    objects()

    setAudio()
    
    postprocess()

    animate()

    window.addEventListener('resize', onWindowResize, false)
}

function setAudio(){
    audio = new Audio()
    audio.loop = true
    audio.src = `song/Konomi Suzuki - Realize.mp3`
    audio.play()
    
    let context = new AudioContext()
    let src = context.createMediaElementSource(audio)
    analyser = context.createAnalyser()
    src.connect(analyser)
    analyser.connect(context.destination)
    analyser.fftSize = 2048
    let bufferLength = analyser.frequencyBinCount
    dataArray = new Uint8Array(bufferLength)
}

function objects(){
    object.createCircleByVertexColors(scene, group.circle.main, post)
    object.createCircle(scene, group.circle.main, nomral)
    // object.createCircleByShader(scene, group.circle.main)
    dataArrayIndex = util.createDataArrayIndex(group.circle.main.children[0])
}

function moves(){
    let time = window.performance.now()

    analyser.getByteFrequencyData(dataArray)

    move.moveCircle(group.circle.main.children, dataArray, dataArrayIndex, group.circle.main, time)
}

function postprocess(){
    let params = {
        // exposure: 1,
        bloomStrength: 0.75,
        bloomThreshold: 0,
        bloomRadius: 1.25
    }

    let renderScene = new THREE.RenderPass(scene, camera)
    renderScene.clearColor = new THREE.Color(1, 1, 1)
    renderScene.clearAlpha = 0

    let effectFXAA = new THREE.ShaderPass(THREE.FXAAShader)
    effectFXAA.uniforms['resolution'].value.set(1 / width * ratio, 1 / height * ratio)

    let copyShader = new THREE.ShaderPass(THREE.CopyShader)
    copyShader.renderToScreen = true

    let bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2(width * ratio, height * ratio), 1.5, 0.4, 0.85)
    bloomPass.threshold = params.bloomThreshold
    bloomPass.strength = params.bloomStrength
    bloomPass.radius = params.bloomRadius

    composer = new THREE.EffectComposer(renderer)
    composer.setSize(width * ratio, height * ratio)
    composer.addPass(renderScene)
    composer.addPass(bloomPass)
    composer.addPass(copyShader)
    composer.addPass(effectFXAA)
}

function getVisibleHeight(depth){
    let cameraOffset = camera.position.z
    if(depth < cameraOffset) depth -= cameraOffset
    else depth += cameraOffset
    let vFov = camera.fov * radian
    return 2 * Math.tan(vFov / 2) * Math.abs(depth)
}

function getVisibleWidth(depth){
    let height = getVisibleHeight(depth)
    return height * camera.aspect
}

function onWindowResize(){
    width = window.innerWidth
    height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    composer.setSize(width * ratio, height * ratio);
}

function render(){
    moves()

    // camera.lookAt(scene.position)
    // renderer.render(scene, camera)
    // composer.render()
    renderer.autoClear = false
    renderer.clear()
    
    camera.layers.set(0)
    composer.render()
    
    renderer.clearDepth()
    camera.layers.set(1)
    renderer.render(scene, camera)
}

function animate(){
    render()
    requestAnimationFrame(animate)
}