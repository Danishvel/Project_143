
/*created by prashant shukla */

var paddle2 =10,paddle1=10;

var paddle1X = 10,paddle1Height = 110;
var paddle2Y = 685,paddle2Height = 70;

var score1 = 0, score2 =0;
var paddle1Y;

var  playerscore =0;
var audio1;
var pcscore =0;
rightwristx = 0; 
rightwristy = 0; 
//ball x and y and speedx speed y and radius
var ball = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}

function preload() {
  ball_touch_paddel = loadSound("ball_touch_paddel.wav");
  ball_missed = loadSound("missed.wav");
  game_over = loadSound("gameover.wav");
}

function setup(){
  var canvas =  createCanvas(700,600);
  canvas.parent('Canvas');

  video = createCapture(VIDEO);
  video.size(700, 600);
  video.hide();

  posenet = ml5.poseNet(video, modelloded);
  posenet.on('pose', gotposes);
}

function modelloded() {
  console.log("Loaded!!!!!!!!!!");
}

gamestatus = "";

function Start() {
  gamestatus = "start";
  document.getElementById("Sta").innerHTML = "Game Is Loaded";
}

function draw(){
  if (gamestatus == "start") {
    background(0); 
    image(video, 0, 0, 700, 600);
   
    fill("black");
    stroke("black");
    rect(680,0,20,700);
   
    fill("black");
    stroke("black");
    rect(0,0,20,700);
   
    fill("red");
       circle(rightwristx, rightwristy, 20);
    
      //funtion paddleInCanvas call 
      paddleInCanvas();
    
      //left paddle
      fill(250,0,0);
       stroke(0,0,250);
       strokeWeight(0.5);
      paddle1Y = rightwristy; 
      rect(paddle1X,paddle1Y,paddle1,paddle1Height,100);
      
      
       //pc computer paddle
       fill("#FFA500");
       stroke("#FFA500");
      var paddle2y =ball.y-paddle2Height/2;  rect(paddle2Y,paddle2y,paddle2,paddle2Height,100);
       
       //function midline call
       midline();
       
       //funtion drawScore call 
      drawScore();
      
      //function models call  
      models();
      
      //function move call which in very important
       move();
  }
}



//function reset when ball does notcame in the contact of padde
function reset(){
   ball.x = width/2+100,
   ball.y = height/2+100;
   ball.dx=3;
   ball.dy =3;
   if (pcscore == 4) {
    ball_missed.stop();  
   }
   else{
    ball_missed.play();
   }
}


//function midline draw a line in center
function midline(){
    for(i=0;i<591;i+=10) {
    var y = 0;
    fill("white");
    stroke(0);
    rect(width/2,y+i,10,480);
    }
    }

    function Restart() {
      loop();
      background(0); 
      image(video, 0, 0, 700, 600);
     
      fill("black");
      stroke("black");
      rect(680,0,20,700);
     
      fill("black");
      stroke("black");
      rect(0,0,20,700);
     
      fill("red");
         circle(rightwristx, rightwristy, 20);
      
        //funtion paddleInCanvas call 
        paddleInCanvas();
      
        //left paddle
        fill(250,0,0);
         stroke(0,0,250);
         strokeWeight(0.5);
        paddle1Y = rightwristy; 
        rect(paddle1X,paddle1Y,paddle1,paddle1Height,100);
        
        
         //pc computer paddle
         fill("#FFA500");
         stroke("#FFA500");
        var paddle2y =ball.y-paddle2Height/2;  rect(paddle2Y,paddle2y,paddle2,paddle2Height,100);
         
         //function midline call
         midline();
         
         //funtion drawScore call 
        drawScore();
        
        //function models call  
        models();
        
        //function move call which in very important
         move(); 
        }

//function drawScore show scores
function drawScore(){
    textAlign(CENTER);
    textSize(20);
    fill("Black");
    stroke(250,0,0)
    text("Player:",100,50)
    text(playerscore,140,50);
    text("Computer:",500,50)
    text(pcscore,555,50)
}


//very important function of this game
function move(){
   fill(50,350,0);
   stroke(255,0,0);
   strokeWeight(0.5);
   ellipse(ball.x,ball.y,ball.r,20)
   ball.x = ball.x + ball.dx;
   ball.y = ball.y + ball.dy;
   if(ball.x+ball.r>width-ball.r/2){
       ball.dx=-ball.dx-0.5; 
       ball_touch_paddel.play();      
   }
  if (ball.x-2.5*ball.r/2< 0){
  if (ball.y >= paddle1Y&& ball.y <= paddle1Y + paddle1Height) {
    ball.dx = -ball.dx+1;
    ball_touch_paddel.play();
  }
  else{
    pcscore++;
    reset();
    navigator.vibrate(100);
  }
}
if(pcscore ==4){
    fill("#FFA500");
    stroke(0)
    rect(0,0,width,height-1);
    fill("white");
    stroke("white");
    textSize(25);
    game_over.play();
    text("Game Over!☹☹",width/2,height/2);
    text("Click on Restart button",width/2,height/2+30)
    noLoop();
    pcscore = 0;
}
   if(ball.y+ball.r > height || ball.y-ball.r <0){
       ball.dy =- ball.dy;
   }   
}


//width height of canvas speed of ball 
function models(){
    textSize(18);
    fill("black");
    noStroke();
    text("Width:"+width,185,15);
    text("Speed:"+abs(ball.dx),100,15);
    text("Height:"+height,285,15)
}


//this function help to not go te paddle out of canvas
function paddleInCanvas(){
  if(mouseY+paddle1Height > height){
    mouseY=height-paddle1Height;
  }
  if(mouseY < 0){
    mouseY =0;
  }  
}

function gotposes(results) {
  if (results.length > "0") {
    rightwristx = results[0].pose.rightWrist.x;
    rightwristy = results[0].pose.rightWrist.y;
    console.log("Right Wrist X : " + rightwristx + " , Right Wrist Y : " + rightwristy);
  }
}