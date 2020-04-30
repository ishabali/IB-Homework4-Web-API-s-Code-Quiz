var questions = [{
    question: "1. Which software company developed JavaScript?",
    choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
    correctAnswer: 1
}, {
    question: "2. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
    choices: ["undefined", "0", "prints nothing", "Syntax error"],
    correctAnswer: 0
}, {
    question: "3. How do you write 'Hello World' in an alert box?",
    choices: ["msg('Hello World')", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');"],
    correctAnswer: 3
}, {
    question: "4. What function to add an element at the begining of an array and one at the end?",
    choices: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
    correctAnswer: 1
}, {
    question: "5. Look at the following selector: $('div'). What does it select?",
    choices: ["The first div element", "The last div element", "All div elements", "Current div element"],
    correctAnswer: 2
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;
var initials = "";
var highScore = 0;
var c=180;
var t;


$(document).ready(function() {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    timedCount();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();

                    $('#iTimeShow').html('Quiz Time Completed!');
                    $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
                    c=185;

                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                    return false;

                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            
            $('#iTimeShow').html('Time Remaining:');
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

    //Display High Scores with initials on clicking High Score Button    
    $('#highScores').on('click', function(){
        if (!quizOver){
            debugger;
            console.log(quizOver);
            alert("Please Take the Quiz First");
        }
        else{
            alert (initials + "'s Highest Quiz Score so far is: " + highScore);
        }
    });

});

// -----------------------------------------------------------------------
function timedCount()
	{
		if(c == 185) 
		{ 
			return false; 
		}
		
		var hours = parseInt( c / 3600 ) % 24;
		var minutes = parseInt( c / 60 ) % 60;
		var seconds = c % 60;
		var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);            
		$('#timer').html(result);
		
		if(c == 0 )
		{
			displayScore();
			$('#iTimeShow').html('Quiz Time Completed!');
			$('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
			c=185;
			// $(document).find(".preButton").text("View Answer");
            $(document).find(".nextButton").text("Play Again?");
            quizOver = true;
            return false;
		}
		
		c = c - 1;
		t = setTimeout(function()
		{
			timedCount()
		},1000);
	}



// -----------------------------------------------------------------------

// This displays the current question AND the choices
function displayCurrentQuestion() {

    if(c == 185) { 
        c = 180; timedCount();
    }

//    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

// -----------------------------------------------------------------------

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();

    setTimeout(function()
    {
    //    viewResults();
    },3000);

}

// -----------------------------------------------------------------------

function displayScore() {
    initials = (prompt("Enter your initials: ")).toUpperCase();
    initials = initials.replace(/ /g, "");
      
    if ((initials === null)||(initials === "")||(initials.length === 0)) {
        alert("Please enter your initials");
        displayScore();
        return;
    }
    if (correctAnswers > highScore){
        highScore = correctAnswers;
    }
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
   
}

// -----------------------------------------------------------------------

function hideScore() {
    $(document).find(".result").hide();
}

// -----------------------------------------------------------------------

setTimeout(function()
		{
//			viewResults();
        },3000);
// -----------------------------------------------------------------------


