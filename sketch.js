var dog, hungryDogImg, happyDogImg, foodObj, database;
var addFoodButton, feedFoodButton;
var feedDogClicked = false;
var fedTime, lastFed, lastFedHours, fedHours;
var startTime, latestTime, elapsedTime;
var playerName, dogName;
var gameState = 0;
var formObj;

function preload()
{
  hungryDogImg = loadImage("hungryDog.png");
  happyDogImg = loadImage("happyDog.png");
}

function setup()
{
  database = firebase.database();
  database.ref('/').update({gameState: 0});
  createCanvas(1000, 400);
  dog = createSprite(800, 200, 150, 150);
  dog.addImage(hungryDogImg);
  dog.scale = 0.15;
  dog.visible = false;
  formObj = new Form();
  formObj.display();
  foodObj = new Food(720, 220);
}

function draw() 
{
  if (formObj.getGameState() === 1)
  {
    background(46, 139, 87);
    dog.visible = true;

    feedFoodButton = createButton("Feed the dog");
    feedFoodButton.position(700, 95);
    feedFoodButton.mousePressed(feedDog);

    addFoodButton = createButton("Add Food");
    addFoodButton.position(800, 95);
    addFoodButton.mousePressed(addFood);
    foodObj.display();

    if(feedDogClicked) 
    {
      latestTime = new Date();
      elapsedTime = (latestTime - startTime)/1000;
      if(elapsedTime <= 5) 
      {
        foodObj.showDogFood();
      }
      else
      {
        dog.addImage(hungryDogImg);
      }
    }
    fedTime = foodObj.getFeedTime();
    fedTime.on("value", function(data){lastFed = data.val()});
    fedHours = foodObj.getFeedHour();
    fedHours.on("value", function(data){lastFedHours = data.val()});
    drawSprites();
    fill(255, 255, 254);
    textFont("Lucida Calligraphy");
    textSize(15);
    text("Hello " + playerName.trim() + " !! Please feed your hungry pet " + dogName.trim() + ".", 10, 100);
    if(feedDogClicked)
    {
      if(lastFedHours >= 12)
      {
        text("Last Feed: " + lastFed + " PM", 300, 30);
      }
      else if(lastFedHours === 0)
      {
        text("Last Feed: 12 AM", 350, 30);
      }
      else
      {
        text("Last Feed: " + lastFed + " AM", 350, 30);
      }
    }
}
}

function feedDog()
{
  startTime = new Date();
  feedDogClicked = true;
  dog.addImage(happyDogImg);
  foodObj.deductFood();
  foodObj.updateFeedTime(hour() + ":" + minute());
  foodObj.updateFeedHour(hour());
}

function addFood()
{
  foodObj.addFood();
}