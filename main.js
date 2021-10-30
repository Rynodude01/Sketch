function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}
function clearCanvas(){
    background("white");
}
function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
        //If mouse is pressed, draw line between previous and current position
    }
}
function classifyCanvas(){
    classifier.classify(canvas,gotresult);
}
function gotresult(error, result){
    if(error){
        console.error(error);
    }
    console.log(result);
    document.getElementById("label").innerHTML = "label: "+result[0].label;
    document.getElementById("Confidence").innerHTML = "Confidence: "+Math.round(result[0].confidence * 100)+"%";
    utterThis = new SpeechSynthesisUtterance(result[0].label);
    synth.speak(utterThis);
}
