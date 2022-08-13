var road, roadImg;
var car, carImg;

var trucksGroup, truck1, truck2, truck3;
var gameOverImg, restartImg;

var checkPointSound, crashSound;

var score;

var gameState = "play"

function preload(){
roadImg = loadImage("road_01.png")

carImg = loadImage("car_01.png")

truck1 = loadImage("truck99.png")
truck2 = loadImage("truck100.png")
truck3 = loadImage("truck101.png")

gameOverImg = loadImage("gameOver1.png")
restartImg = loadImage("restart.png")

checkPointSound = loadSound("checkPoint.mp3")
crashSound = loadSound("crashSound.wav")
}

function setup() {
 createCanvas(600,600)
 
 road = createSprite(300,300)
 road.addImage("road",roadImg);
 road.velocityY = 4

 car = createSprite(200,200,50,50);
 car.scale = 0.13
 car.addImage("car",carImg)

 gameOver = createSprite(300,200);
 gameOver.addImage(gameOverImg);

 restart = createSprite(300,350);
 restart.addImage(restartImg);

 gameOver.scale = 0.5;
 restart.scale = 0.035;

 truck1G = new Group();
 truck2G = new Group();
 truck3G = new Group();

 score= 0;

}

function draw() {
 background(225)

 if(gameState === "play"){
    gameOver.visible = false
    restart.visible = false

    edges=createEdgeSprites();
    car.collide(edges);


    score = score + Math.round(getFrameRate()/60)

    if(score>0 && score%100 === 0){
        checkPointSound.play() 
     }

    if(road.y > 400){
        road.y = height/2
     }

    if(keyDown("LEFT_ARROW")){
        car.x = car.x -5
    }

    if(keyDown("RIGHT_ARROW")){
        car.x = car.x +5
    }

    if(keyDown("UP_ARROW")){
        car.y = car.y -5
    }

    if(keyDown("DOWN_ARROW")){
        car.y = car.y +5
    }
    
    spawnTruck1();
    spawnTruck2();
    spawnTruck3();

    if(truck1G.isTouching(car)){
        gameState = "end"
        crashSound.play()
    }

    if(truck2G.isTouching(car)){
        gameState = "end"
        crashSound.play()
    }

    if(truck3G.isTouching(car)){
        gameState = "end"
        crashSound.play()
    }

    

 }

    if(gameState === "end"){
      console.log("hey")

        gameOver.visible = true;
        restart.visible = true;

        road.velocityY = 0;

        truck1G.setLifetimeEach(-1)
        truck2G.setLifetimeEach(-1)
        truck3G.setLifetimeEach(-1)
        
        truck1G.setVelocityEach(0)
        truck2G.setVelocityEach(0)
        truck3G.setVelocityEach(0)
    

    }

    if(mousePressedOver(restart)){
        reset();
    }
    

    drawSprites();
    text("Score: "+ score, 500,50);
    fill(255)
    textSize(100)
}

function reset(){
    gameState = "play"
    gameOver.visible = false;
    restart.visible = false;

    road.velocityY = 4

    truck1G.destroyEach();
    truck2G.destroyEach();
    truck3G.destroyEach();

    score=0;
}

function spawnTruck1(){
      if(frameCount % 240 === 0) {
        var truck01 = createSprite(Math.round(random(50,550),1));
        truck01.addImage(truck1)
        truck01.velocityY = +6;
        truck01.setCollider("rectangle",0,0,300,900)
        truck01.debug = false

        truck01.scale = 0.025;
        truck01.lifetime = 300

        truck1G.add(truck01)

      }
}


function spawnTruck2(){
    if(frameCount % 300 === 0) {
      var truck02 = createSprite(Math.round(random(50,550),1));
      truck02.addImage(truck2)
      truck02.velocityY = +6;
      truck02.setCollider("rectangle",0,0,300,600)
      truck02.debug = false

      truck02.scale = 0.2;
      truck02.lifetime = 300

      truck2G.add(truck02)

    }
}


function spawnTruck3(){
    if(frameCount % 360 === 0) {
      var truck03 = createSprite(Math.round(random(50,550),1));
      truck03.addImage(truck3)
      truck03.velocityY = +6;
      truck03.setCollider("rectangle",0,0,300,900)
      truck03.debug = false

      truck03.scale = 0.1;
      truck03.lifetime = 300

      truck3G.add(truck03)

    }
}