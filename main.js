var vid = ""
var status = ""
function preload(){
    vid = createVideo("video.mp4")
    vid.hide()
}

function setup(){
    canvas = createCanvas(600, 500) 
    canvas.center()

}

function draw(){
    image(vid,0, 0, 600, 500)
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Objeto Detectado"
}

function modelLoaded(){
    console.log("modelo carregado!")
    status = true
    vid.loop()
    vid.speed(1.2)
    vid.volume(0)
}

