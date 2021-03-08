const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var bground, bgroundImg;
var balloon, ball, ballonImg, balloonPos;
var database, position;

function preload(){

  bgroundImg = loadImage("hab01.png");
  balloonImg = loadImage("hab02.png");
}

function setup() {
  createCanvas(1000,800);

  database = firebase.database();
  //console.log(database);
  engine = Engine.create();
  world = engine.world;

  bground = createSprite(500, 400, 1000, 800);
  bground.addImage("background", bgroundImg);
  bground.scale = 0.5;

  balloon = createSprite(500, 400, 50, 50);
  balloon.addImage("hotairbalon", balloonImg);
  balloon.scale = 0.5;


  balloonPos = database.ref('ball/position');
  balloonPos.on("value", readPosition, showError);

}

function draw() {
  background(255,255,255); 
  
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    } 
  drawSprites();
}

function writePosition(x,y){
  database.ref('ball/position').set({
      'x' : position.x + x,
      'y' : position.y + y
})
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
