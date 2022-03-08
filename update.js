console.log("Hello from update!")
// execute the update function every 10 milliseconds
function update() {
    
    fillCanvas("rgb(28, 141, 253)");
    
    // move the diamond left
    diamondXPosition += diamondXSpeed;
 
    // hold diamond mod højre i starten
    if(gameState == "menu") {
        diamondXPosition = spawnXPosition;
    }
 
    // Tjek om fuglen og diamanden kolliderer
    if(gameState == "action") {
        if(theseCirclesCollide(
            birdXPosition,
            birdYPosition,
            birdHitboxRadius,
            diamondXPosition,
            diamondYPosition,
            diamondHitboxRadius
        ))
        { // if they do, increase the score and respawn
            diamondSound.play();
            scoreValue += diamondValue;
            diamondXPosition += canvas.width + 200;
            diamondYPosition = randomBetween(0, canvas.height);
        }
 
        // repawn the diamond when it goes off screen
        if(diamondXPosition < -100) {
            diamondXPosition += canvas.width + 200;
            diamondYPosition = randomBetween(0, canvas.height);
        }
    }
 
    // draw the diamond
    drawImage(
        diamondImage,
        diamondXPosition,
        diamondYPosition,
        diamondImage.width,
        diamondImage.height
    );

// move the Udiamond left
UdiamondXPosition += UdiamondXSpeed;
 
// hold Udiamond mod højre i starten
if(gameState == "menu") {
    UdiamondXPosition = spawnXPosition;
}

// Tjek om fuglen og Udiamanden kolliderer
if(gameState == "action") {
    if(theseCirclesCollide(
        birdXPosition,
        birdYPosition,
        birdHitboxRadius,
        UdiamondXPosition,
        UdiamondYPosition,
        UdiamondHitboxRadius
    ))
    { // if they do, increase the score and respawn
        UdiamondSound.play();
        scoreValue += UdiamondValue;
        UdiamondXPosition += canvas.width * 6;
        UdiamondYPosition = randomBetween(0, canvas.height);
    }

    // repawn the Udiamond when it goes off screen
    if(UdiamondXPosition < -100) {
        UdiamondXPosition += canvas.width * 6;;
        UdiamondYPosition = randomBetween(0, canvas.height);
    }
}

// draw the Udiamond
drawImage(
    UdiamondImage,
    UdiamondXPosition,
    UdiamondYPosition,
    UdiamondImage.width,
    UdiamondImage.height
);

    // for every cloud
    for(let cloud of clouds) {
        // draw the cloud
        drawImage(
            cloudImage,
            cloud.xPosition,
            cloud.yPosition,
            cloudImage.width,
            cloudImage.height
        );
        // update the x position of the cloud
        cloud.xPosition += cloudXSpeed;
        // remove cloud if it moves beyond the destruction point
        if(cloud.xPosition < destructionXPosition) {
            clouds = clouds.remove(cloud);
        }

    }
    // spawn a new cloud when the it is time
    cloudTimeSinceLastSpawn += timeSinceLastFrame;
    if(cloudTimeSinceLastSpawn>cloudSpawnInterval) {
        clouds.push({
            xPosition: spawnXPosition,
            yPosition: randomBetween(0, canvas.height/2), 
        });
        cloudTimeSinceLastSpawn = 0;
    }    

    // draw the bird image
    drawImage(birdImage,
        birdXPosition,
        birdYPosition,
        birdImage.width,
        birdImage.height
    );

    // draw the bird hitbox if debugmode is on
    if(debugModeIsOn) {
        drawCircle(
            birdXPosition, 
            birdYPosition, 
            birdHitboxRadius, 
            hitboxColor
        );
    }

    // update the bird movement
    birdYSpeed += birdYAccelleration;
    birdYPosition += birdYSpeed;

    if (gameState == "action") {
        // end the game if the bird touches the canvas edge
        if(canvas.height < birdYPosition || birdYPosition < 0) {
            gameOverSound.play();
            birdCanFlap = false;
            gameState = "gameover";
            music.pause();
            music.currentTime = 0;
        }
    }

    // for each coin
    for(let coin of coins) {
        // draw the coin
        drawImage(coinImage,
            coin.xPosition,
            coin.yPosition,
            coinImage.width,
            coinImage.height
        );

        if(debugModeIsOn) {
            drawCircle(
                coin.xPosition, 
                coin.yPosition, 
                coinHitboxRadius, 
                hitboxColor
            );
        }

        // move the coin
        coin.xPosition += coinXSpeed;


        if(gameState == "action") {
            // check if the coins collides with the bird
            if(theseCirclesCollide(
                birdXPosition,
                birdYPosition,
                birdHitboxRadius,
                coin.xPosition,
                coin.yPosition,
                coinHitboxRadius
            )) 
            { // if they do, increase the score
                coinSound.play();
                scoreValue += coinValue;
                coins = coins.remove(coin);
            }
        }

         // remove coin if it goes off the screen
         if(coin.xPosition < destructionXPosition) {
            coins = coins.remove(coin);
        }
    }

    // spawn new coins
    if(gameState == "action" &&
    coinTimeSinceLastSpawn>coinSpawnInterval) {
        coins.push({
            xPosition: spawnXPosition,
            yPosition: randomBetween(0, canvas.height)
        });
        coinTimeSinceLastSpawn = 0;
    }

    if(gameState == "action") {
        coinTimeSinceLastSpawn += timeSinceLastFrame;
    }



    // for each fireball
    for(let fireball of fireballs) {
        // draw the fireball
        drawImage(fireballImage,
            fireball.xPosition,
            fireball.yPosition,
            fireballImage.width,
            fireballImage.height
        );

        if(debugModeIsOn) { // draw the hotbox
            drawCircle(
                fireball.xPosition, 
                fireball.yPosition, 
                fireballHitboxRadius, 
                hitboxColor
            );
        }

        // move the fireball
        fireball.xPosition += fireballXSpeed;

        // remove fireball if it goes off the screen
        if(fireball.xPosition < destructionXPosition) {
            fireballs = fireballs.remove(fireball);
        }

        if(gameState == "action") {
            // check if the fireball collides with the bird
            if(theseCirclesCollide(
                birdXPosition,
                birdYPosition,
                birdHitboxRadius,
                fireball.xPosition,
                fireball.yPosition,
                fireballHitboxRadius
            )) 
            { // if they do, end the game
                birdCanFlap = false;
                gameOverSound.play();
                gameState = "gameover";
                music.pause();
                music.currentTime = 0;
            }
        }
    }

    // spawn new fireballs
    if(gameState == "action" &&
    fireballTimeSinceLastSpawn>fireballSpawnInterval) {
        fireballs.push({
            xPosition: spawnXPosition,
            yPosition: randomBetween(0, canvas.height)
        });
        fireballTimeSinceLastSpawn = 0;
    }

    if(gameState == "action") {
        fireballTimeSinceLastSpawn += timeSinceLastFrame;
    }

    // for each bowser
    for(let bowser of bowsers) {
        // draw the bowser
        drawImage(bowserImage,
            bowser.xPosition,
            bowser.yPosition,
            bowserImage.width,
            bowserImage.height
        );

        if(debugModeIsOn) { // draw the hotbox
            drawCircle(
                bowser.xPosition, 
                bowser.yPosition, 
                bowserHitboxRadius, 
                hitboxColor
            );
        }

        // move the fireball
        bowser.xPosition += bowserXSpeed;

        // remove fireball if it goes off the screen
        if(bowser.xPosition < destructionXPosition) {
            bowsers = bowsers.remove(bowser);
        }

        if(gameState == "action") {
            // check if the fireball collides with the bird
            if(theseCirclesCollide(
                birdXPosition,
                birdYPosition,
                birdHitboxRadius,
                bowser.xPosition,
                bowser.yPosition,
                bowserHitboxRadius
            )) 
            { // if they do, end the game
                birdCanFlap = false;
                gameOverSound.play();
                gameState = "gameover";
                music.pause();
                music.currentTime = 0;
            }
        }
    }

    // spawn new fireballs
    if(gameState == "action" &&
    bowserTimeSinceLastSpawn>bowserSpawnInterval) {
        bowsers.push({
            xPosition: spawnXPosition,
            yPosition: randomBetween(0, canvas.height)
        });
        bowserTimeSinceLastSpawn = 0;
    }

    if(gameState == "action") {
        bowserTimeSinceLastSpawn += timeSinceLastFrame;
    }

    //draw the scoreboard
    drawImage(
        scoreImage,
        scoreImageXPosition,
        scoreImageYPosition,
        scoreImage.width,
        scoreImage.height
    );
    drawText(
        "x"+ scoreValue,
        scoreTextXPosition,
        scoreTextYPosition,
        scoreTextSize,
        scoreTextColor
    );

    // draw the menu text
    if(gameState == "menu") {
        drawText (
            menuFirstText,
            menuTextXPosition,
            menuTextYPosition,
            menuTextSize,
            menuTextColor
        )
    }

    if(gameState == "action" && birdYAccelleration == 0) {
        drawText (
            menuSecondText,
            menuTextXPosition,
            menuTextYPosition,
            menuTextSize,
            menuTextColor
        )
    }

    // draw the game over text
    if(gameState == "gameover") {
        drawText (
            gameOverText,
            menuTextXPosition,
            menuTextYPosition,
            menuTextSize,
            menuTextColor
        )
    }

    if(debugModeIsOn) {
        drawText(
            "timeSinceLastFrame: " + timeSinceLastFrame,
            canvas.width/2,
            20,
            12,
            "black"
        );
    }

    // update timeSinceLastFrame and draw next frame
    timeOfCurrentFrame = new Date().getTime();
    timeSinceLastFrame = timeOfCurrentFrame - timeOfLastFrame;
    timeOfLastFrame = timeOfCurrentFrame;
    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);