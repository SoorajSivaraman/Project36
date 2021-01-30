class Form
{
    constructor()
    {

    }

    display()
    {
        background(255, 199, 46);
        fill("blue");
        textFont("Lucida Calligraphy");
        textSize(13);
        var title = createElement('h2');
        title.html("Virtual Pet Game");
        title.position(600, 75);
        text("Name of the Player", 230, 180);
        text("Name of the Dog", 230, 230);
        var playerNameInput = createInput('');
        var dogNameInput = createInput('');
        var button = createButton('Play');
        playerNameInput.position(600, 250);
        dogNameInput.position(600, 300);
        button.position(660, 350);
        button.mousePressed(function()
        {
            playerName = playerNameInput.value();
            dogName = dogNameInput.value();
            if(playerName.trim() != '' && dogName.trim() != '')
            {
                title.position(600, 0);
                playerNameInput.hide();
                dogNameInput.hide();
                button.hide();
                database.ref('/').update({gameState: 1});
            }
            else
            {
                text("Please enter value for Player and Dog names !!", 325, 325);
            }
        });
    }

    getGameState()
    {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data){gameState = data.val()});
        return gameState;
    }
}