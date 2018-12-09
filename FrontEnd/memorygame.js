//main javascript backend for Lab6_MemoryGame
//Crafted by Josias Moukpe

//GLOBAL VARIABLES///////////////////////////////
var showcount = [];                                                                        //tracks the number of images that can be shown at a time
var unlocked_img = 0;                                                                      //tracks the number of unlocked images  //wins at 12 images
var n_tries;                                                                               //tracks the number of tries 
var start_time;                                                                            //tracks the time at which the new game button is pressed, marking the start time of the game
var sec_cout = 0;                                                                              //rracks the number of seconds elapsed
var is_new_game = false;                                                                   //tracks if the new game button has been pressed
var win_sfx = new Audio("sfx/win_space.wav");                                              //sound object for  win  
var loss_sfx = new Audio("sfx/power_loss.wav");                                            //sound object for loss

//list of images, with duplicated by pair to facilitate the shuffling
var imgs = ["blue_screen_death.png", "error_compiling.png", "no_internet.jpg", 
            "segmentation_fault.png", "stopped_working.png", "vs_errors.png",
            "blue_screen_death.png", "error_compiling.png", "no_internet.jpg", 
            "segmentation_fault.png", "stopped_working.png", "vs_errors.png"] 



//FUNCTIONS///////////////////////////////////////            
function new_game () { //randomize the images underneath the tiles and resets the game

    is_new_game = true;                                                                     //it is a new game press 
    for(let i = 0; i < 12; ++i) hide_img(i);                                                //hide all the tiles
    while(showcount.length != 0) showcount.pop();                                           //reset the show count list
    unlocked_img = 0;                                                                       //reset the number of unlocked images
    n_tries = 0; document.getElementById("tries").innerHTML = "Tries: " + n_tries;          //reset number of tries and display zero on the board
    score = 0; document.getElementById("score").innerHTML = "Score: " + unlocked_img;       //reset score and display zero on the board
    sec_cout = 0; document.getElementById("time").innerHTML = "Time: " + sec_cout + " seconds"; //reset count of seconds and display zero seconds on theboard 
    imgs = shuffle(imgs);                                                                   //reshuffle the images set
    alert("New Game Set");                                                                  //alerts the play that a new game started
    start_time = new Date();                                                                //trigger the start of the time object

} //end function new_game

function show_img (idx, safe_to_unlock = true, end_game = false) { //show the image underneath the tile

    var img_locus = document.getElementsByTagName("input");                                 //get the position of the image to show

    if(is_new_game) {                                                                       //only executes and show image if it is a new game
        img_locus[idx].setAttribute("src", "imgs/" + imgs[idx]);                            //display the image pressed
        if(safe_to_unlock) {                                                                //if is not checked yet so it is safe to unlock
            showcount.push(idx);                                                            //add this image to the showcount
            ++unlocked_img;                                                                 //increment the number of unlocked images 
        }
        if(!end_game) setTimeout(function() { check_game(); }, 500);                                      //short delay of .5 s 
    }
    else { //is not a new game
        alert("Press \"New Game\" first");                                                  //notify the user to press new game
    }
} //end function show_img

function hide_img (idx) { //conceal the image at the given index
    var img_locus = document.getElementsByTagName("input");                                 //get the image position
    img_locus[idx].setAttribute("src", "imgs/skull_alert.jpg");                             //replace that image by the facedown image
    --unlocked_img;                                                                         //decrement the image count
    showcount.pop();                                                                        //pop that image from the showcount
} //end function hide_img

function check_game () {//check the state of the game to see if 2 images are identical                                                         
    console.log("is new game = " + is_new_game);                                            //Tracks if it is new game
    var img_locus = document.getElementsByTagName("input");                                 //get the position of the image to show
    var end_game = false;                                                                   //track if the game has ended to be used in show_img() 

    if(unlocked_img >= 12) {                                                                //executes if 12 images in total are unlocked
        var elapsed = (new Date() - start_time)/1000;                                       //computing the time elapsed since the press of new game
        document.getElementById("score").innerHTML = "Score: " + unlocked_img;              //updating the score at the bottom of the board
        setTimeout(function() {                                                             //delay the victory message to give the board time to update
            alert("You Triumphed!\n" + "Time = " + elapsed.toFixed(2) + " seconds |  Score = " + unlocked_img.toFixed(2) + " |  Tries = " + n_tries); //victory message
        }, 500);                                                                            //500ms or .5 second delay 
        end_game = true                                                                     //clearing the showcount since the game has ended
    } // end if    
    
    if(showcount.length >= 2) { //executes if showcount reach 2
        if((imgs[showcount[0]] == imgs[showcount[1]]) && (showcount[0] != showcount[1])) {  //check by name if the two images are identical and if yes
            win_sfx.play();
            show_img(showcount[1], false, end_game);                                        // display second image without updating showcount
            show_img(showcount[0], false, end_game);                                        // display first image without updating showcount
            document.getElementById("score").innerHTML = "Score: " + unlocked_img;          //update the score at the bottom of the board
            for(let i = 0; i <= 1; ++i) img_locus[showcount[i]].disabled = true;            //disabling faceup cards
            while(showcount.length != 0) showcount.pop();                                   //clear the showcount
        } 
        else { //images are different
            loss_sfx.play();
            setTimeout(function() {                                                          //display the different images for a brief second 
                hide_img(showcount[1]);                                                      //then hide the first  
                hide_img(showcount[0]);                                                      // and second image
                ++n_tries;                                                                   // update the number of tries
                document.getElementById("tries").innerHTML = "Tries: " + n_tries;            // display current number of tries at the bottom of the board
            }, 100);                                                                         //short delay of 100 ms 
        }
    }
} //end function check_game

window.setInterval(function(){ //tracks the number of seconds elapsed
    if(unlocked_img < 12) {                                                                  //executes and keeps track of time only if not all the images are unlocked
        document.getElementById("time").innerHTML = "Time: " + ++sec_cout + " seconds";      //display the number of seconds elapsed
    }
  }, 1000); //end function                                                                   //every seconds or 1000ms   


//HELP FUNCTIONS//////////////////////////////////////////////////////////////////
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
//////////////////////////////////////////////////////////////////////////////////////