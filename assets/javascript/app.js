////Variable Declaration////
var questions = [{
        quiz: "Great Whites and Hammerheads are what type of animals?",
        options: ["sharks", "Elephans", "dogs"],
        correct: 0
    },
    {
        quiz: " How many legs does a spider have??",
        options: ["10", "4", "8", "6"],
        correct: 2
    }, {
        quiz: " What is the name of the pirate in Peter Pan?",
        options: ["Alice", "Capitan Hook", "Donal"],
        correct: 1
    }, {
        quiz: " How many rings make up the symbol of the Olympic Games?",
        options: ["5", "10", "9", "12"],
        correct: 0
    }, {
        quiz: " According to the Dr. Seuss book, who stole Christmas?",
        options: ["The joker", "The Grinch.", "The Elf", "Mrs Santa Claus"],
        correct: 1
    }, {
        quiz: " In which continent is the country of Egypt found?",
        options: ["Las Vegas", "Unided States", "South America", "Africa", "Europe", "Tokio"],
        correct: 3
    }, {
        quiz: " What is a brontosaurus?",
        options: ["A dinosaur", "a Food Plate", "A movie", "An Animal"],
        correct: 0
    }, {
        quiz: " How many grams are there in a kilogram?",
        options: ["1", "1500", "3.49", "1000", "10", "100"],
        correct: 3
    }, {
        quiz: " What's the colored part of the human eye called?",
        options: ["Retina", "Pupil", "Iris"],
        correct: 2
    }

];


var correct = 0;
var incorrect = 0;
var answares = [];
var time = 60;
var html_pre_question = '<label class="radio-inline"><input type = "radio" name ="';
console.log(questions.length);
console.log(questions);

////Functions to create every answare options
function options(questions, num_question) {
    answares = questions.options;
    for (var j = 0; j < answares.length; j++) {
        $(html_pre_question + num_question + '" ' + "value =" +
            answares[j] + ">" + answares[j] + "</label>").insertAfter("#" + num_question);
    }
}

// Function Clock time ///////////////////
function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    } else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}

function count() {
    time--;
    var converted = timeConverter(time);
    $("#clock-container").html(converted);
}

function start() {
    intervalId = setInterval(count, 1000);
}

// END FUNCTION CLOCKWATCH////////////////





///Should be an array with the Questions , options , and correct answare, most like a object
/// This part for loop to create the questions 
function start_trivia() {
    /////start the clock////
    start();
    /////creation of the questions 
    for (var i = 0; i < questions.length; i++) {
        var question_count = i + 1;
        var question_label = $("<div>");
        question_label.addClass("question");
        question_label.text(questions[i].quiz);
        question_label.attr('id', question_count);
        $(".question_container").append(question_label);
        ////call the function to create the optional answares
        options(questions[i], question_count);
    }
}
//////// Creating the Start Button////////
var start_button = $("<button>");
start_button.addClass("btn btn-default");
start_button.text("PLAY!!!!");
$("#start_button").html(start_button);
//////////////////////////////////////////

//Button created on the beginin , call the function to star the game//////// 
$("button").on("click", function(event) {
    $("#start_end_container").remove();
    start_trivia();
    $(".question_container").append('<div></div><button id="submit" class="btn btn-primary">Submit</button></div>');
});
/////////////////////////////////////


$("#submit").on("click", function(event) {
    event.preventDefault();
    var value_answare = $('input[name="1"]:checked').val();
    console.log(value_answare);

});
//Here the Trivia get started
// start_trivia();
///This part to receive the answares


///Timer