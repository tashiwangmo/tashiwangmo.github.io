var triviaQuestions = [{
	question: "What Is Peter Parker’s middle name?",
	answerList: ["Benjamin", "William", "Thomas"],
	answer: 0
},{
	question: "Which villain possessed the Infinity Gems?",
	answerList: ["Galatus", "Thanos", "Ebony Maw"],
	answer: 1
},{
	question: "What is Black Widow’s real name?",
	answerList: ["Natalia Romanova", "Natasha Alianavna", "Natalie Romanovic"],
	answer: 0
},{
	question: "Jessica Jones is married to...?",
	answerList: ["Luke Cage", "Kilgrave", "Matt Murdock"],
	answer: 2
},{
	question: "Who killed Charles Xavier in 'Avengers Vs. X-Men'?",
	answerList: ["Magneto", "Cyclops", "Legion"],
	answer: 1
},{
	question: "Which member of the Guardians of the Galaxy is related to Thanos?",
	answerList: ["Gamora", "Drax the Destroyer", " Groot"],
	answer: 0
},{
	question: "In 'Civil War', Captain America fought against…?",
	answerList: ["Nick Fury", "Bucky Barnes", "Iron Man"],
	answer: 2
}];

var search = ['peter+parker', 'thanos', 'black+widow', 'jessica+jones', 'charles+xavier', 'groot', 'winter+soldier'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;

// first page on loading the trivia.Page with start button only. On clicking the start button, it hides the button and loads the questions.
$('#startOverBtn').hide()

$('#startBtn').click( function(){
    $(this).hide();
	newGame();
});

$('#startOverBtn').click(function(){
	$(this).hide();
	newGame();
});

function newGame(){
    //four divs for score page
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
    $('#unanswered').empty();
    
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
    //divs for answer page
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 3; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').click (function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

// shows what is displayed on the last page.
function score(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
    $('#gif').empty();
    
    

	$('#finalMessage').html("<h3>Let's check out your score.</h3>");
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('btn-custom');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Try again?');
}


//Clear the question page and display the answers with giphy api

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').hide(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	var giphyURL = "http://api.giphy.com/v1/gifs/search?api_key=N7Xczx6vHkDSSDlyQ0RM9F7hSbu47lVh&q=" + search[currentQuestion] + "&limit=1&rating=g"
    $.ajax({url: giphyURL, 
        method: 'GET'}).done(function(giphy){
        var currentGif = giphy.data;
        console.log(giphy);
        console.log(currentGif);
		$.each(currentGif, function(index,value){
        var embedGif = value.images.original.url;
        
		newGif = $('<img>');
		newGif.attr('src', embedGif);
		newGif.addClass('gifImg');
		$('#gif').html(newGif);
		});
	});
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html("<h3>Yes, that's right!</3>");
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html("<h3>Nope, incorrect....</3>");
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html("<h3>Oops, you are out of time!</h3>");
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(score, 3000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	
}
