
var video1;
var status = "";
var objects = [];
var inputText = ""; 

function setup() {
  
    canvas = createCanvas(600, 500);
    canvas.center();
    

    video1 = createCapture(VIDEO);
    video1.size(600, 500);
    video1.hide();
}

function start() {
  
    objDetector = ml5.objectDetector('cocossd', modelLoaded);
    
   
    document.getElementById('status').innerHTML = "Status: Identificando Objetos";
    

    inputText = document.querySelector('input[type="text"]').value;
}

function modelLoaded() {
    console.log("Modelo carregado!");
   
    status = true;
}

function draw() {

    image(video1, 0, 0, width, height);
    
  
    if (status != "") {
        objDetector.detect(video1, gotResult);

        for (let i = 0; i < objects.length; i++) {
            document.getElementById('status').innerHTML = "Objetos detectados";
            document.getElementById('qtdObj').innerHTML = "Quantidade de objetos detectados: " + objects.length;
            
            fill("red");
            let percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

           
            if (objects[i].label === inputText) {
               
                video1.stop();
                
                
                objDetector.detect(gotResult);
                
               
                document.getElementById('status').innerHTML = "Objeto Encontrado";
                
                
                let synth = window.speechSynthesis;
                let utterThis = new SpeechSynthesisUtterance("Objeto " + inputText + " encontrado");
                synth.speak(utterThis);
                
                
                break;
            }
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    
    
    objects = results;
}