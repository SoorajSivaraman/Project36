class Food
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.image = loadImage("milk.png");
        this.foodStock = 10;
        this.feedTime = 12;
        this.fedHour = 12;
    }

    display()
    {
        var x = 80, y = 100;
        imageMode(CENTER);
        if(this.foodStock != 0)
        {
            for(var i = 0; i < this.foodStock; i++)
            {
                if(i % 10 === 0)
                {
                    x = 80;
                    y = y + 50; 
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }

    deductFood()
    {
        if(this.foodStock <= 0) this.foodStock = 0;
        else this.foodStock = this.foodStock - 1;
        this.updateFoodStock(this.foodStock);
    }

    addFood()
    {
        if(this.foodStock < 40) this.foodStock = this.foodStock + 1;
        this.updateFoodStock(this.foodStock);
    }

    showDogFood()
    {
        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);
    }

    getFeedTime()
    {
        this.feedTime = database.ref('feedTime');
        return this.feedTime;
    }

    getFeedHour()
    {
        this.fedHour = database.ref('fedHour');
        return this.fedHour;
    }

    updateFeedTime(feedTime)
    {
        database.ref('/').update({feedTime: feedTime});
    }

    updateFeedHour(feedHour)
    {
        database.ref('/').update({fedHour: feedHour});
    }

    updateFoodStock(foodCount)
    {
        database.ref('/').update({foodStock: foodCount});
    }
}