//var engine, world;
var player;

var npc1, npc1Img;
var npc2, npc2Img;
var npc3, npc3Img;
var npc4, npc4Img;
var obstacle;
var line1, line2;

var score, boost, lives;

var startButton, startButtonImg;

var car2, car2Img;

var roadBackground, backgroundImg;
var divider;
var gameState = "start";

var obstaclesGroup;

var startBg, startBgImg

var movingRoad, selectBackgound;

var tempBgImg,tempBg;

//var resetButton, resetButtonImg

var lives = 2;


function preload() {
    backgroundImg = loadImage("images/highwayRacing.jpg");

    startBgImg = loadImage("images/racingBackground.jpeg");
    //npc1Img = loadImage("images/barrier.png");
    npc2Img = loadImage("images/OilBarrel.png");
    npc3Img = loadImage("images/trafficCone.png");
    npc4Img = loadImage("images/trash.png");
    
    car1Img = loadImage("images/PlayerCar.png");
    car2Img = loadImage("images/redcar.png")

    startButtonImg = loadImage("images/startButton.png");
    selectBackgound = loadImage("images/selectScreen.jpg");

    tempBgImg = loadImage("images/highwayRacing.jpg");

    //resetButtonImg = loadImage("images/reset.png");

   
}

function setup(){
    var canvas = createCanvas(1430,800);
    player = createSprite(width/3,600);
    player.addImage(car1Img);
    player.scale = 0.55;
    player.visible = false;

    startButton = createSprite(width/1.87-50, height/1.23-150,20,20);
    startButton.addImage(startButtonImg);
    startButton.scale = 0.4;
    startButton.visible = false;
    //engine = Engine.create();
    //world = engine.world;

    //resetButton = createSprite(width/2, height/2,50,50);
    //resetButton.addImage(resetButtonImg);
    //resetButton.scale = 1;
    //resetButton.visible = false;

    car2 = createSprite(2*width/3,600);
    car2.addImage(car2Img);
    car2.scale = 0.55;
    car2.visible = false;

    roadBackground = createSprite(width/2,400,width,height);
    roadBackground.scale = 0.5;
    roadBackground.addImage(backgroundImg);
    roadBackground.visible = false;
    

    startBg = createSprite(width/2,400,width,height);
    startBg.addImage(startBgImg);
    startBg.visible = false;

    obstaclesGroup = new Group();

    tempBg = createSprite(displayWidth/2,200,width,height);
    tempBg.addImage(tempBgImg);
    tempBg.scale = 0.3;
    tempBg.visible = false;

    
}

function draw(){
    background(0);
    

    if(gameState === "start"){

      background(startBgImg);
  
      strokeWeight(5);
      stroke("0");
      fill("#2d3436");
      textSize(35);
      text("Hello! Welcome to the Infinite Racing Game. Race for as long as you can!", 170,height/4);
  
      strokeWeight(5);
      stroke("0");
      fill("#2d3436");
      textSize(32);
      text("Be safe from the obstacles. If you touch them, the game will end",200,height/2.32-30);

      text
      
      strokeWeight(5);
      fill("#2d3436");
      textSize(32);
      text("Use your mouse to move the car and avoid the obstacles", 300, height/1.43-150);

      strokeWeight(5);
      fill("#2d3436");
      textSize(32);
      text("If you lose press refresh for another chance", 400, height/1.43+100);

      if(frameCount>250){
      startButton.visible = true;
      }
      if(mousePressedOver(startButton)){
        gameState = "select";
        startButton.destroy();
        player.visible = true;
      }
    }

    if (gameState === "select"){
      background(selectBackgound);
      player.visible = true;
     car2.visible = true;
      fill("#b2bec3")
      textSize(100);
      text("Pick A Car!",width/2-230,200);
      if(mousePressedOver(player)){
        gameState = "play";
        player.x = width/2;
        player.y = 600;
        car2.destroy();
      }
      else if(mousePressedOver(car2)){
        gameState = "play";
        player.addImage(car2Img);
        player.x = width/2;
        player.y = 650;
        car2.destroy();
      }
    }

    if(gameState === "play"){
      background(tempBgImg);
    player.x = mouseX;
    tempBg.visible = true;
    tempBg.velocityY = 15;
    tempBg.lifetime = 350;
    textSize(40);
    fill("black");
    //text("Lives " + lives, width/2,height/2);
    

  
  /*  movingRoad = createSprite(displayWidth/2, displayHeight-200, 10,50);
    movingRoad.addImage(backgroundImg);
    movingRoad.velocityY = 2;
    //movingRoad.lifetime = 350;
    //movingRoad.shapeColor = "blue";
    movingRoad.scale = 0.3;
    player.depth = movingRoad.depth;
    player.depth = player.depth+1;

    if (movingRoad.y < (displayHeight/2)){
      movingRoad.y = displayHeight-100;
    }
    */
  

      if(frameCount% 100 === 0){
        movingRoad = createSprite(displayWidth/2, -750, 10, 60);
        movingRoad.addImage(backgroundImg);
        movingRoad.velocityY = 15;
        movingRoad.lifetime = 350;
        //movingRoad.shapeColor = "blue";
        movingRoad.scale = 0.3;
        player.depth = movingRoad.depth;
        player.depth = player.depth+1;
      }
      player.depth = player.depth+1;
    
    //roadBackground.visible = true;

    }
  

   
    

    

    if (frameCount % 40 === 0 && gameState === "play") {
      
      spawnObstacles();
    }

    if(obstaclesGroup.isTouching(player)){
      gameState = "end";
      
    
  }
  if(gameState === "end"){
    background("gray");
    //resetButton.visible = true;
    //obstaclesGroup.destroy();
    movingRoad.visible = false;
    player.visible = false; 
    //obstaclesGroup.destroy();
    fill("black");
    textSize(80);
    text("Oh No!", width/2-200, height/2);
    text("Refresh to Restart!!", width/2-400, height/2 + 100);

  }
     drawSprites();
  }

  function spawnObstacles() {
    if (frameCount % 100 === 0){
      var w = Math.round(random(width-1000,width-400));
      var h = Math.round(random(height-800,height-200));
      var obstacle = createSprite(w,-50,10,40);
      obstacle.velocityY = 15;
      if(frameCount%100){
        obstacle.velocityY = obstacle.velocityY + 0.4;
      }
      
      //(6 + score/100);
      
       //generate random obstacles
       var rand = Math.round(random(1,3));
       switch(rand) {
         //case 1: obstacle.addImage(npc1Img);
         //        break;
         case 1: obstacle.addImage(npc2Img);
                 break;
         case 2: obstacle.addImage(npc3Img);
                 break;
         case 3: obstacle.addImage(npc4Img);
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.4;
       obstacle.lifetime = 600;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
       if(gameState === "end"){
        obstaclesGroup.destroy();
       }
    }
   }
  






