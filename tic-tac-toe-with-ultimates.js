const players = [
  {
    player: "player1",
    character: "",
    turn: null
  },
  {
    player: "player2",
    character: "",
    turn: null
  }];

let bunnyTurtleBoard = [
  "","","", //[0] == square0,[1] == square1,[2] == square2,
  "","","", //[3] == square3,[4] == square4,[5] == square5,
  "","",""  //[6] == square6,[7] == square7,[8] == square8
];

let winner = "";

let characterSelectionTime = true;
characterSelection(characterSelectionTime);

startingPlayer();

let player1BunnyUltimate = false;
let player2BunnyUltimate = false;
let player1TurtleUltimate = false;
let player2TurtleUltimate = false;
let player1And2doctorStrangeBoardMoves = [];

document.getElementById("middle-div").addEventListener("click", function(event) {
  if (bunnyTurtleBoard[event.target.id.replace("square","")] == "") { //if the bunnyTurtleBoard[index] is empty, then proceed to place the character image on that square
  
    if (players[0].character == "player-1-doctorstrange" || players[1].character == "player-2-doctorstrange") {
      player1And2doctorStrangeBoardMoves.push(event.target.id);
    }

    //PLAYER 1
    if (players[0].turn == true) { //if player1's turn...
    //player1 takes its turn.

    if (player1TurtleUltimate == true) {
      activateTurtleUltimate(event.target.id, player1TurtleUltimate);
    }
    else {
      let img = document.createElement("img");
      imgName = (players[0].character).replace("player-1-","");
      img.src = "images/" + imgName + ".png";
      img.style.cssText = "width: 100%";
      document.getElementById(event.target.id).appendChild(img);

    /* The visible bunny-turtle-toe board on the web page is also
    represented in the bunnyTurtleBoard array. 

    If player1 clicks #square0 div, then event.target.id == "square0";
    so bunnyTurtleBoard[0] will be equal to "player1"
    */
    if (event.target.id == "square0") {
      bunnyTurtleBoard[0] = players[0].player;
    } 
    else if (event.target.id == "square1") {
      bunnyTurtleBoard[1] = players[0].player;
    }
    else if (event.target.id == "square2") {
      bunnyTurtleBoard[2] = players[0].player;
    }
    else if (event.target.id == "square3") {
      bunnyTurtleBoard[3] = players[0].player;
    }
    else if (event.target.id == "square4") {
      bunnyTurtleBoard[4] = players[0].player;
    }
    else if (event.target.id == "square5") {
      bunnyTurtleBoard[5] = players[0].player;
    }
    else if (event.target.id == "square6") {
      bunnyTurtleBoard[6] = players[0].player;
    }
    else if (event.target.id == "square7") {
      bunnyTurtleBoard[7] = players[0].player;
    }
    else if (event.target.id == "square8") {
      bunnyTurtleBoard[8] = players[0].player;
    }
    }

    //CHECK IF player1 WON. 
    checkIfPlayerWon(players[0].player);

    //CHECK IF PLAYER1 BUNNY ULTIMATE IS ON. IF IT IS NOT, THEN PLAYER2's TURN. IF IT IS ON, THEN PLAYER1's TURN ONE MORE TIME.
    if (player1BunnyUltimate == false) {
      //Once player1 takes its turn, turn will go over to player2. 
      players[0].turn = false;
      players[1].turn = true;
      
      //#player-turn paragraph will now display "Turn: player2"
      document.getElementById("player-turn").innerHTML = "player2";
    }
    else if (player1BunnyUltimate == true) {
      players[0].turn = true;
      players[1].turn = false;

      player1BunnyUltimate = false;
    }
  }

    //PLAYER 2
    else if (players[1].turn == true) { //if player2's turn...

    //player2 takes its turn.
      if (player2TurtleUltimate == true) {
        activateTurtleUltimate(event.target.id, player2TurtleUltimate);
      } 
      else {
        let img = document.createElement("img");
        imgName = (players[1].character).replace("player-2-","");
        img.src = "images/" + imgName + ".png";
        img.style.cssText = "width: 100%";

        document.getElementById(event.target.id).appendChild(img);

         /*The visible bunny-turtle board on the web page is also 
        represented in the bunnyTurtleBoard array.

        If the player2 clicks #square0 div, then event.target.id == "square0";
        so bunnyTurtleBoard[0] will be equal to "player2"
        */
        if (event.target.id == "square0") {
          bunnyTurtleBoard[0] = players[1].player;
        } 
        else if (event.target.id == "square1") {
          bunnyTurtleBoard[1] = players[1].player;
        }
        else if (event.target.id == "square2") {
          bunnyTurtleBoard[2] = players[1].player;
        }
        else if (event.target.id == "square3") {
          bunnyTurtleBoard[3] = players[1].player;
        }
        else if (event.target.id == "square4") {
          bunnyTurtleBoard[4] = players[1].player;
        }
        else if (event.target.id == "square5") {
          bunnyTurtleBoard[5] = players[1].player;
        }
        else if (event.target.id == "square6") {
          bunnyTurtleBoard[6] = players[1].player;
        }
        else if (event.target.id == "square7") {
          bunnyTurtleBoard[7] = players[1].player;
        }
        else if (event.target.id == "square8") {
          bunnyTurtleBoard[8] = players[1].player;
        }
      }

      //CHECK IF player2 WON. 
      checkIfPlayerWon(players[1].player);


      //CHECK IF PLAYER2 BUNNY ULTIMATE IS ON. IF IT IS NOT, THEN PLAYER1's TURN. IF IT IS ON, THEN PLAYER1's TURN ONE MORE TIME.
      if (player2BunnyUltimate == false) {
        //Once player1 takes its turn, turn will go over to player2. 
        players[1].turn = false;
        players[0].turn = true;
        
        //#player-turn paragraph will now display "Turn: player1"
        document.getElementById("player-turn").innerHTML = "player1";
      }
      else if (player2BunnyUltimate == true) {
        players[1].turn = true;
        players[0].turn = false;

        player2BunnyUltimate = false;
      }
    }
  }
});

function startingPlayer() { 
  /*
  1) Goal: This function will randomly determine which player begans first in Bunny-Turtle-Toe.
  */

  //startingPlayer will equal either "Bunny" or "Turtle"
  let randomIndex = Math.floor(Math.random() * players.length);
  let startingPlayer = players[randomIndex].player;

  //#player-turn paragraph will display startingPlayer
  document.getElementById("player-turn").innerHTML = startingPlayer;
  
  /*
  If startingPlayer equals "player1", then players[0].turn will equal true,
  while players[1].turn will equal false. 

  If startingPlayer equals "player2", then players[1].turn will equal true,
  while players[0].turn will equal false. 
  */
  if (startingPlayer == "player1") {
    players[0].turn = true;
    players[1].turn = false;
  } 
  else if (startingPlayer == "player2") {
    players[1].turn = true;
    players[0].turn = false;
  }


  /*Fixing Bug:
  Bug: After character selection is over, sometimes, the tic-tac-toe board has a broken image in one of the squares.
  Solution: 
  */ 
 for (let i = 0; i < bunnyTurtleBoard.length; i++) {
   let squareAndNumber = "square" + i;
   document.getElementById(squareAndNumber).replaceChildren();
 }

}

function checkIfPlayerWon(boardPlayer) { 
  /*
  1) Goal: This function receives the boardPlayer, which is "player1" or "player2", and then checks if the boardPlayer won.
  */
  if (bunnyTurtleBoard[0] == boardPlayer && bunnyTurtleBoard[1] == boardPlayer && bunnyTurtleBoard[2] == boardPlayer) {
      winner = boardPlayer;
    }
    else if (bunnyTurtleBoard[3] == boardPlayer && bunnyTurtleBoard[4] == boardPlayer && bunnyTurtleBoard[5] == boardPlayer) {
      winner = boardPlayer;
    }
    else if (bunnyTurtleBoard[6] == boardPlayer && bunnyTurtleBoard[7] == boardPlayer && bunnyTurtleBoard[8] == boardPlayer) {
      winner = boardPlayer;
    }
    else if (bunnyTurtleBoard[0] == boardPlayer && bunnyTurtleBoard[3] == boardPlayer && bunnyTurtleBoard[6] == boardPlayer) {
      winner = boardPlayer;
    }
    else if (bunnyTurtleBoard[1] == boardPlayer && bunnyTurtleBoard[4] == boardPlayer && bunnyTurtleBoard[7] == boardPlayer) {
      winner = boardPlayer;
    }
    else if (bunnyTurtleBoard[2] == boardPlayer && bunnyTurtleBoard[5] == boardPlayer && bunnyTurtleBoard[8] == boardPlayer) {
      winner = boardPlayer;
    }
    else if (bunnyTurtleBoard[0] == boardPlayer && bunnyTurtleBoard[4] == boardPlayer && bunnyTurtleBoard[8] == boardPlayer) {
      winner = boardPlayer;
    }
    else if (bunnyTurtleBoard[2] == boardPlayer && bunnyTurtleBoard[4] == boardPlayer && bunnyTurtleBoard[6] == boardPlayer) {
      winner = boardPlayer;
    }

    //If a winner exists, the lines of code inside the if statement will display the winner on the screen. 
    if (winner == boardPlayer) {
      let winnerDisplayScreen = document.createElement("div");
      winnerDisplayScreen.style.cssText = "position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; background-color: rgba(0,0,0,0.1);";
      document.getElementById("bunny-turtle-toe-DIV").appendChild(winnerDisplayScreen);

      let winnerDisplayBox = document.createElement("div");
      winnerDisplayBox.style.cssText = "position: absolute; top: 50%; left: 38%; background-color: black; padding: 10px 12px 10px 12px; border-radius: 10px;";
      winnerDisplayScreen.appendChild(winnerDisplayBox);

      let winnerText = document.createElement("p");
      winnerText.innerHTML = "Victory: " + winner;
      winnerText.style.cssText = "color: white;"
      winnerDisplayBox.appendChild(winnerText);
    }
}

function characterSelection(characterSelectionTimeBooleanValue) {
  //players' name displayed in character selection page
  document.getElementById("player-1-name").innerHTML = players[0].player;
  document.getElementById("player-2-name").innerHTML = players[1].player;

  /*
  if it is characterSelection time, then the tic-tac-toe board will be invisible while the
  character-selection will be visible 
  */
  if (characterSelectionTimeBooleanValue == true) {
    document.getElementById("middle-div").style.cssText = "opacity: 0;";
    document.getElementById("bottom-div").style.cssText = "opacity: 0;";

    document.getElementById("player-1-character-selection-div").style.cssText = "opacity: 1; top: 25%;";
    document.getElementById("player-2-character-selection-div").style.cssText = "opacity: 1; top: 75%;";
  }

  /*
  if it is not characterSelection time, then the tic-tac-toe board will become visible while the character selection
  will become invisible 
  */
  else if (characterSelectionTimeBooleanValue == false) {
    document.getElementById("middle-div").style.cssText = "opacity: 1;";
    document.getElementById("bottom-div").style.cssText = "opacity: 1;";

    document.getElementById("player-1-character-selection-div").style.cssText = "opacity: 0; top: -200px;";
    document.getElementById("player-2-character-selection-div").style.cssText = "opacity: 0; top: -200px;";
  }
}

/*
//The lines of code below does this: if the player CLICKS over the character's image,
then #player-1-character-description paragraph will display that character's ultimate.

  Characters' Ultimates: 
  Turtle:
  - The Turtle will place its shell on one of four corner squares. The shell will then randomly slide in one direction and empty that direction's squares.
  Bunny: 
  - With its agility, the bunny can place two squares in one turn. 
  Genghis Khan:
  - Genghis Khan -- the Khan of Khans -- has set out to capture all the lands under the Eternal Blue Sky, and also
  one of his opponent's squares. 
  Doctor Strange:
  - With his time stone, Doctor Strange can reverse time, whcih means reversing the last two turns. If 
  his opponent activated his ultimate within the last two turns, then the opponent will get its ultimate back.  
  Scarlet Witch:
  - Able to control minds, Scarlet Witch can make her opponent's next turn be out of his control and just
  randomly placed on the tic-tac-toe board. 
  Steve (Minecraft):
  - Steve has no ultimate. 
*/

document.getElementById("player-1-bunny").addEventListener("click", function(event) {
  document.getElementById("player-1-character-description").innerHTML = "Ultimate: With its agility, the bunny can place two squares in one turn."
});

document.getElementById("player-1-turtle").addEventListener("click", function(event) {
  document.getElementById("player-1-character-description").innerHTML = "Ultimate: The Turtle will place its shell on one of four corner squares. The shell will then randomly slide in one direction and empty that direction's squares."

});

document.getElementById("player-1-genghiskhan").addEventListener("click", function(event) {
  document.getElementById("player-1-character-description").innerHTML = "Ultimate: Genghis Khan -- the Khan of Khans -- has set out to capture all the lands under the Eternal Blue Sky, and also one of his opponent's squares."
});

document.getElementById("player-1-doctorstrange").addEventListener("click", function(event) {
  document.getElementById("player-1-character-description").innerHTML = "With his time stone, Doctor Strange can reverse time, which means reversing the last two turns. If his opponent activated his ultimate within the last two turns, then the opponent will get his ultimate back."
});

document.getElementById("player-1-scarletwitch").addEventListener("click", function(event) {
  document.getElementById("player-1-character-description").innerHTML = "Able to control minds, Scarlet Witch will make her opponent's next move be randomly placed on the tic-tac-toe board."
});

document.getElementById("player-1-steve").addEventListener("click", function(event) {
  document.getElementById("player-1-character-description").innerHTML = "Steve has no ultimate. Just like his default skin, he must play default."
});

document.getElementById("player-2-bunny").addEventListener("click", function(event) {
  document.getElementById("player-2-character-description").innerHTML = "Ultimate: With its agility, the bunny can place two squares in one turn."
});

document.getElementById("player-2-turtle").addEventListener("click", function(event) {
  document.getElementById("player-2-character-description").innerHTML = "Ultimate: The Turtle will place its shell on one of four corner squares. The shell will then randomly slide in one direction and empty that direction's squares."
});

document.getElementById("player-2-genghiskhan").addEventListener("click", function(event) {
  document.getElementById("player-2-character-description").innerHTML = "Ultimate: Genghis Khan -- the Khan of Khans -- has set out to capture all the lands under the Eternal Blue Sky, and also one of his opponent's squares."
});

document.getElementById("player-2-doctorstrange").addEventListener("click", function(event) {
  document.getElementById("player-2-character-description").innerHTML = "With his time stone, Doctor Strange can reverse time, which means reversing the last two turns. If his opponent activated his ultimate within the last two turns, then the opponent will get his ultimate back."
});

document.getElementById("player-2-scarletwitch").addEventListener("click", function(event) {
  document.getElementById("player-2-character-description").innerHTML = "Able to control minds, Scarlet Witch will make her opponent's next move be randomly placed on the tic-tac-toe board."
});

document.getElementById("player-2-steve").addEventListener("click", function(event) {
  document.getElementById("player-2-character-description").innerHTML = "Steve has no ultimate. Just like his default skin, he must play default."
});

//character description code (^^^) ends here. 

/*
1) Goal: If a player clicks a character image, then the character image will have a box shadow.
If a player then clicks another character image, then the first character image will be unselected and the second character
image will be selected. 
*/

let player1SelectedCharacter = "";

document.getElementById("player-1-character-selection-images-div").addEventListener("click", function(event) { //If a character image is clicked, then this function(event) will run.
  if (event.target.id !== "player-1-character-selection-images-div") { //if event.target.id is not empty space but is actually a character's image
    document.getElementById(event.target.id).style.cssText = "box-shadow: 0px 0px 2px 2px rgb(0,0,0);"; //the character's image will receive a box shadow 

    if (player1SelectedCharacter.length > 1) {
      document.getElementById(player1SelectedCharacter).style.cssText = "box-shadow: none;";
    }
    player1SelectedCharacter = event.target.id; 
  }
});


let player2SelectedCharacter = "";

document.getElementById("player-2-character-selection-images-div").addEventListener("click", function(event) { //If a character image is clicked, then this function(event) will run.
  if (event.target.id !== "player-2-character-selection-images-div") { //if event.target.id is not empty space but is actually a character's image
    document.getElementById(event.target.id).style.cssText = "box-shadow: 0px 0px 2px 2px rgb(0,0,0);"; //the character's image will receive a box shadow 

    if (player2SelectedCharacter.length > 1) {
      document.getElementById(player2SelectedCharacter).style.cssText = "box-shadow: none;";
    }
    player2SelectedCharacter = event.target.id; 
  }
});


/*
1) Goal: If #player-1-lock-in-button button is clicked, then function(event) will run. This function will check whether player1 has
picked his character. If player1 has picked his character, then the function will make players[0].character = player1SelectedCharacter
AND will also make the box-shadow of the character image gold color.
After the above paragraph has been executed, player1LockedIn will equal true. If player1LockedIn and player2LockedIn are both true,
then characterSelectionTime = false. characterSelection(characterSelectionTime) will run; this function will then make the
character selection display invisible and make visible the tic-tac-toe game. 

If #player-1-lock-in-button button is clicked, then function(event) will run. This function will check whether
player1 has picked his character. If player has picked his character, then the function will players[0].character = player1SelectedCharacter AND
will make the box-shadow around the character image "GOLD"
If player has not picked his character, then the function will simply do nothing. 
*/

let player1LockedIn = false;
let player2LockedIn = false;

document.getElementById("player-1-lock-in-button").addEventListener("click", function(event) { //If #player-1-lock-in-button is clicked, then function(event) will run.
  if (player1SelectedCharacter.length > 1) { //This function will check whether player1 has picked his character. If yes, then...
    players[0].character = player1SelectedCharacter; 
    document.getElementById(player1SelectedCharacter).style.cssText = "box-shadow: 0px 0px 4px 4px rgb(255, 215, 0);"; //have the character image have a gold-colored box shadow

    player1LockedIn = true; 

    if (player1LockedIn == true && player2LockedIn == true) {
      characterSelectionTime = false;
      characterSelection(characterSelectionTime);
    }
  }
});

document.getElementById("player-2-lock-in-button").addEventListener("click", function(event) { //If #player-2-lock-in-button is clicked, then function(event) will run.
  if (player2SelectedCharacter.length > 1) { //This function will check whether player2 has picked his character. If yes, then...
    players[1].character = player2SelectedCharacter;
    document.getElementById(player2SelectedCharacter).style.cssText = "box-shadow: 0px 0px 4px 4px rgb(255, 215, 0);"; //have the character image's have a gold-colored box shadow

    player2LockedIn = true;

    if (player1LockedIn == true && player2LockedIn == true) {
      characterSelectionTime = false;
      characterSelection(characterSelectionTime);
    }
  }
});

/*
1) Goal: If #player-1-ultimate-button button is clicked, then function(event) will run.
Depending on which character player1 is, his ultimate will do different thing. 
*/
document.getElementById("player-1-ultimate-button").addEventListener("click", function(event) {
 if (players[0].character == "player-1-bunny") {
   player1BunnyUltimate = true;
 }
 else if (players[0].character == "player-1-turtle") {
   player1TurtleUltimate = true;
 }
 else if (players[0].character == "player-1-genghiskhan") {
   let player2List = [];
   for (let i = 0; i < bunnyTurtleBoard.length; i++) {
     if ("player2" == bunnyTurtleBoard[i]) {
       player2List.push(i);
     }
   }

   let randomIndex = Math.floor(Math.random() * player2List.length);
   let chosenIndex = player2List[randomIndex];
   console.log(chosenIndex);
   
   let squareName = "square" + chosenIndex;
   document.getElementById(squareName).replaceChildren();

   let genghisKhanImage = document.createElement("img");
   genghisKhanImage.src = "images/genghiskhan.png";
   genghisKhanImage.id = "genghiskhanultimate";
   genghisKhanImage.style.cssText = "width: 100%;";

   document.getElementById(squareName).appendChild(genghisKhanImage);
   bunnyTurtleBoard[chosenIndex] = "player1";

   players[0].turn = false;
   players[1].turn = true;
   document.getElementById("player-turn").innerHTML = "player2"

   player1And2doctorStrangeBoardMoves.push(squareName + "genghiskhan");
   

   checkIfPlayerWon(players[0].player);
 }
 else if (players[0].character == "player-1-doctorstrange") { //if player1 activates doctor strange 
  activateDoctorStrangeUltimate(player1And2doctorStrangeBoardMoves, 0, 1);
  checkIfPlayerWon(players[1].player);
 }
 else if (players[0].character == "player-1-scarletwitch") {
   if (players[1].turn == true) {
     document.getElementById("player-turn").innerHTML = "player1 plays for player2";
   }
   checkIfPlayerWon(players[1].player); 
 }
 else if (players[0].character == "player-1-steve") {

 }
});



document.getElementById("player-2-ultimate-button").addEventListener("click", function(event) {
 if (players[1].character == "player-2-bunny") {
   player2BunnyUltimate = true;
 }
 else if (players[1].character == "player-2-turtle") {
   player2TurtleUltimate = true;
 }
 else if (players[1].character == "player-2-genghiskhan") {
  let player1List = [];
   for (let i = 0; i < bunnyTurtleBoard.length; i++) {
     if ("player1" == bunnyTurtleBoard[i]) {
       player1List.push(i);
     }
   }

   let randomIndex = Math.floor(Math.random() * player1List.length);
   let chosenIndex = player1List[randomIndex];
   console.log(chosenIndex);
   
   let squareName = "square" + chosenIndex;
   document.getElementById(squareName).replaceChildren();

   let genghisKhanImage = document.createElement("img");
   genghisKhanImage.src = "images/genghiskhan.png";
   genghisKhanImage.id = "genghiskhanultimate";
   genghisKhanImage.style.cssText = "width: 100%;";

   document.getElementById(squareName).appendChild(genghisKhanImage);
   bunnyTurtleBoard[chosenIndex] = "player2";

   players[1].turn = false;
   players[0].turn = true;
   document.getElementById("player-turn").innerHTML = "player1";

   player1And2doctorStrangeBoardMoves.push(squareName + "genghiskhan");
   
   checkIfPlayerWon(players[1].player);
 }

 else if (players[1].character == "player-2-doctorstrange") {
  activateDoctorStrangeUltimate(player1And2doctorStrangeBoardMoves, 1, 0);
  checkIfPlayerWon(players[1].player);
 }
 else if (players[1].character == "player-2-scarletwitch") {
  if (players[0].turn == true) {
     document.getElementById("player-turn").innerHTML = "player2 plays for player1";
   }
  checkIfPlayerWon(players[1].player)
 }
 else if (players[1].character == "player-2-steve") {

 }
});


function activateTurtleUltimate(ticTacToeSquareID, playerTurtleUltimate) {
 /*
 1) GOAL: This function will activate Turtle's Ultimate
 */
      let shellImg = document.createElement("img");
      shellImg.src = "images/shell.png";
      shellImg.style.cssText = "width: 100%;";
      document.getElementById(ticTacToeSquareID).appendChild(shellImg);
    
      if (event.target.id == "square0") {
        const direction = ["right", "down", "diagonal"];
        let randomIndex = Math.floor(Math.random() * direction.length);
        let shellDirection = direction[randomIndex];
        
        //if shellDirection == "right", then the shell will empty the spaces in the right direction
        if (shellDirection == direction[0]) {
          document.getElementById("square1").replaceChildren();
          document.getElementById("square2").replaceChildren();
          bunnyTurtleBoard[1] = "";
          bunnyTurtleBoard[2] = "";

          setTimeout(function() {
            document.getElementById("square0").replaceChildren();
          }, 1000);
        }

        //if shellDirection == "down", then the shell will empty the spaces in the downward direction
        if (shellDirection == direction[1]) {
          document.getElementById("square3").replaceChildren();
          document.getElementById("square6").replaceChildren();
          bunnyTurtleBoard[3] = "";
          bunnyTurtleBoard[6] = "";

          setTimeout(function() {
            document.getElementById("square0").replaceChildren();
          }, 1000);
        }

        //if shellDirection == "diagonal", then the shell will empty the spaces in the diagonal direction
        if (shellDirection == direction[2]) {
          document.getElementById("square4").replaceChildren();
          document.getElementById("square8").replaceChildren();
          bunnyTurtleBoard[4] = "";
          bunnyTurtleBoard[8] = "";

          setTimeout(function() {
            document.getElementById("square0").replaceChildren();
          }, 1000);
        } 
      } 
      else if (event.target.id == "square2") {
        const direction = ["left", "down", "diagonal"];
        let randomIndex = Math.floor(Math.random() * direction.length);
        let shellDirection = direction[randomIndex];

          //if shellDirection == "left", then the shell will empty the spaces in the left direction
          if (shellDirection == direction[0]) {
          document.getElementById("square0").replaceChildren();
          document.getElementById("square1").replaceChildren();
          bunnyTurtleBoard[0] = "";
          bunnyTurtleBoard[1] = "";

          setTimeout(function() {
            document.getElementById("square2").replaceChildren();
          }, 1000);
        }

        //if shellDirection == "down", then the shell will empty the spaces in the downward direction
        if (shellDirection == direction[1]) {
          document.getElementById("square5").replaceChildren();
          document.getElementById("square8").replaceChildren();
          bunnyTurtleBoard[5] = "";
          bunnyTurtleBoard[8] = "";

          setTimeout(function() {
            document.getElementById("square2").replaceChildren();
          }, 1000);
        }

        //if shellDirection == "diagonal", then the shell will empty the spaces in the diagonal direction
        if (shellDirection == direction[2]) {
          document.getElementById("square4").replaceChildren();
          document.getElementById("square6").replaceChildren();
          bunnyTurtleBoard[4] = "";
          bunnyTurtleBoard[6] = "";

          setTimeout(function() {
            document.getElementById("square2").replaceChildren();
          }, 1000);
        }
      }
      else if (event.target.id == "square6") {
        const direction = ["right", "up", "diagonal"];
        let randomIndex = Math.floor(Math.random() * direction.length);
        let shellDirection = direction[randomIndex];

          //if shellDirection == "right", then the shell will empty the spaces in the right direction
          if (shellDirection == direction[0]) {
          document.getElementById("square7").replaceChildren();
          document.getElementById("square8").replaceChildren();
          bunnyTurtleBoard[7] = "";
          bunnyTurtleBoard[8] = "";

          setTimeout(function() {
            document.getElementById("square6").replaceChildren();
          }, 1000);
        }

        //if shellDirection == "up", then the shell will empty the spaces in the upward direction
        if (shellDirection == direction[1]) {
          document.getElementById("square0").replaceChildren();
          document.getElementById("square3").replaceChildren();
          bunnyTurtleBoard[0] = "";
          bunnyTurtleBoard[3] = "";

          setTimeout(function() {
            document.getElementById("square6").replaceChildren();
          }, 1000);
        }

        //if shellDirection == "diagonal", then the shell will empty the spaces in the diagonal direction
        if (shellDirection == direction[2]) {
          document.getElementById("square4").replaceChildren();
          document.getElementById("square2").replaceChildren();
          bunnyTurtleBoard[4] = "";
          bunnyTurtleBoard[2] = "";

          setTimeout(function() {
            document.getElementById("square6").replaceChildren();
          }, 1000);
        }
      }
      else if (event.target.id == "square8") {
        const direction = ["left", "up", "diagonal"];
        let randomIndex = Math.floor(Math.random() * direction.length);
        let shellDirection = direction[randomIndex];

          //if shellDirection == "left", then the shell will empty the spaces in the left direction
          if (shellDirection == direction[0]) {
          document.getElementById("square6").replaceChildren();
          document.getElementById("square7").replaceChildren();
          bunnyTurtleBoard[6] = "";
          bunnyTurtleBoard[7] = "";

          setTimeout(function() {
            document.getElementById("square8").replaceChildren();
          }, 1000);
        }

        //if shellDirection == "up", then the shell will empty the spaces in the upward direction
        if (shellDirection == direction[1]) {
          document.getElementById("square2").replaceChildren();
          document.getElementById("square5").replaceChildren();
          bunnyTurtleBoard[2] = "";
          bunnyTurtleBoard[5] = "";

          setTimeout(function() {
            document.getElementById("square8").replaceChildren();
          }, 1000);
        }

        //if shellDirection == "diagonal", then the shell will empty the spaces in the diagonal direction
        if (shellDirection == direction[2]) {
          document.getElementById("square0").replaceChildren();
          document.getElementById("square4").replaceChildren();
          bunnyTurtleBoard[0] = "";
          bunnyTurtleBoard[4] = "";

          setTimeout(function() {
            document.getElementById("square8").replaceChildren();
          }, 1000);
        }              
      }
      playerTurtleUltimate = false;
}

function activateDoctorStrangeUltimate(doctorStrangeBoardMoves, doctorStrangePlayerNumber, otherPlayerNumber) {
 if (players[doctorStrangePlayerNumber].turn == true) { //and if it is player1's turn, then...

    //the last two moves will disappear on the bunnyTurtleBoard array.
    let index1 = (doctorStrangeBoardMoves[doctorStrangeBoardMoves.length-1]).replace("square","");
    let index2 = (doctorStrangeBoardMoves[doctorStrangeBoardMoves.length-2]).replace("square","");
    index1 = index1.replace("genghiskhan", "");
    index2 = index2.replace("genghiskhan", "");

    bunnyTurtleBoard[index1] = "";
    bunnyTurtleBoard[index2] = "";

    //if genghiskhan has not used his ultimate last move, then the last move will disappear off the screen
    if (doctorStrangeBoardMoves[doctorStrangeBoardMoves.length-1].includes("genghiskhan") == false) {
      document.getElementById(doctorStrangeBoardMoves[doctorStrangeBoardMoves.length-1].replace("genghiskhan", "")).replaceChildren();
    }
    //if genghiskhan did use his ultimate last move, then the genghiskhan image will be replaced by doctor strange image
    else if (doctorStrangeBoardMoves[doctorStrangeBoardMoves.length-1].includes("genghiskhan") == true) {
      let currentImage = document.getElementById("genghiskhanultimate");
      let newImage = document.createElement("img");
      newImage.src = "images/doctorstrange.png";
      currentImage.src = newImage.src;
    }
    //if genghiskhan has not used his ultimate second to last move, then the second to last move will disappear off the screen
    if (doctorStrangeBoardMoves[doctorStrangeBoardMoves.length-2].includes("genghiskhan") == false) {
      document.getElementById(doctorStrangeBoardMoves[doctorStrangeBoardMoves.length-2].replace("genghiskhan","")).replaceChildren();
    }
    //if genghiskhan did use his ultimate second to last move, then the genghiskhan image will be replaced by doctor strange image
    else if (doctorStrangeBoardMoves[doctorStrangeBoardMoves.length-2].includes("genghiskhan") == true) {
      let currentImage = document.getElementById("genghiskhanultimate");
      let newImage = document.createElement("img");
      newImage.src = "images/doctorstrange.png";
      currentImage.src = newImage.src;
    }

    //time goes back last two moves, which means reversing opponent's last move and doctor strange's last
    //move. this means that it is doctor strange's turn. 
    players[doctorStrangePlayerNumber].turn = true;
    players[otherPlayerNumber].turn = false;

    //display on the screen that it is doctor strange's turn
    document.getElementById("player-turn").innerHTML = "player" + (doctorStrangePlayerNumber+1);
  }
}