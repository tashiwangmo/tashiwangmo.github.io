
// setting up random number 


var randomNumber = Math.floor(Math.random()*(101+1) + 19);
    $("#random").text(randomNumber);
    console.log("Hi christian");
    
//between 19-120

// declaring variables for each image and assigning random number between 1-12
var pokOne = Math.floor(Math.random()*(12) +1);
var pokTwo = Math.floor(Math.random()*(12) +1);
var pokThree = Math.floor(Math.random()*(12) +1);
var pokFour = Math.floor(Math.random()*(12) +1);

//declaring variables for wins and losses
var wins = 0;
var losses = 0;
var totalScore =0;
var audioA = new Audio("assets/images/win.mp3");
var audioB = new Audio("assets/images/loss.mp3");
$("#total-score").text(totalScore)

function reset(){
randomNumber = Math.floor(Math.random()*(101+1) + 19);

var pokOne = Math.floor(Math.random()*(12) +1);
var pokTwo = Math.floor(Math.random()*(12) +1);
var pokThree = Math.floor(Math.random()*(12) +1);
var pokFour = Math.floor(Math.random()*(12) +1);



totalScore = 0;
$("#total-score"). text(totalScore);
$("#random").text(randomNumber)
};

function winning(){
    wins++;
    $("#wins").text(wins);
    $("#win-lose").text("Congrats you WON the battle!");
    console.log("KEEP IT UP WINNER!")
    audioA.play();
   

};
function loosing(){
    losses++;
    $("#losses").text(losses);
    $("#win-lose").html("<h4>This battle is lost.. but you can try again!</h4>");
    console.log("TRY AGAIN,YOU CAN DO BETTER!");
    audioB.play();
};

function check(){
    $("#total-score"). text(totalScore);

    if (randomNumber === totalScore){
        winning();
        reset();
    }
    
    else if (randomNumber < totalScore){
        loosing();
        reset();
    };
}
    
$("#one").click(function(){
    totalScore = totalScore + pokOne;
    
    check();

});

$("#two").click(function(){
    totalScore = totalScore + pokTwo;
    check();
    
});
    
$("#three").click(function(){
    totalScore = totalScore + pokThree;
    check();
        
});

$("#four").click(function(){
    totalScore = totalScore + pokFour;
    check();
    
});


    
