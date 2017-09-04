////Variable Declaration////
var questions = [{
        quiz: "Great Whites and Hammerheads are what type of animals?",
        options: ["sharks", "Elephans", "dogs"],
        correct: "sharks"
    },
    {
        quiz: " How many legs does a spider have??",
        options: ["10", "4", "8", "6"],
        correct: "8"
    }, {
        quiz: " What is the name of the pirate in Peter Pan?",
        options: ["Alice", "Capitan Hook", "Donal"],
        correct: "Capitan Hook"
    }, {
        quiz: " How many rings make up the symbol of the Olympic Games?",
        options: ["5", "10", "9", "12"],
        correct: "5"
    }, {
        quiz: " According to the Dr. Seuss book, who stole Christmas?",
        options: ["The joker", "The Grinch", "The Elf", "Mrs Santa Claus"],
        correct: "The Grinch"
    }, {
        quiz: " In which continent is the country of Egypt found?",
        options: ["Las Vegas", "Unided States", "South America", "Africa", "Europe", "Tokio"],
        correct: "Africa"
    }, {
        quiz: " What is a brontosaurus?",
        options: ["A dinosaur", "a Food Plate", "A movie", "An Animal"],
        correct: "A dinosaur"
    }, {
        quiz: " How many grams are there in a kilogram?",
        options: ["1", "1500", "3.49", "1000", "10", "100"],
        correct: "1000"
    }, {
        quiz: " What's the colored part of the human eye called?",
        options: ["Retina", "Pupil", "Iris"],
        correct: "Iris"
    }

];


var corrects = 0;
var incorrects = 0;
var blanks = 0;
var answares = [];
var time = 120;
var results = [];

////Functions to create every answare options
function options(questions, num_question) {
    answares = questions.options;
    for (var j = 0; j < answares.length; j++) {
        var options_labels = $("<label>");
        options_labels.addClass("radio-inline");
        var option_buttoms = $("<input>");
        option_buttoms.attr("type", "radio");
        option_buttoms.attr("name", num_question);
        option_buttoms.attr("value", answares[j]);
        options_labels.append(option_buttoms);
        options_labels.append(answares[j]);
        options_labels.insertAfter("#" + num_question);
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

// Function Evaluate Answares
function evaluate(questions, results) {
    var answare_key = [];

    // This section make an array with all the answares keys
    for (var x = 0; x < questions.length; x++) {
        answare_key.push(questions[x].correct);
    }
    // This section assign the empty question by default the size of the questions array 
    blanks = answare_key.length;
    // start evaluation of the answares
    for (var z = 0; z < answare_key.length; z++) {
        // here will compare if the question was answared and if exist
        for (var w = 0; w < results.length; w++) {
            var key = parseInt(results[w].name);
            var val = results[w].value;
            // corrects and incorrects counts
            if (z == key) {
                if (answare_key[z] == val) {
                    corrects++;
                    blanks--;
                } else {
                    incorrects++;
                    blanks--;
                }
            }
        }
    }
    return corrects, incorrects, blanks;
}
// ///////////////////////////////////////////

function display_result(corrects, incorrects, blanks) {
    // This will clean out the question container and also remove the clockdown
    $("form").remove();
    $("#clock-container").remove();
    var answares_main_container = $("<div>");
    answares_main_container.addClass("start");
    answares_main_container.append("<h3>Corrects Answers: <span>" + corrects + "</span></h3>");
    answares_main_container.append("<h3>Incorrect Answers: <span>" + incorrects + "</span></h3>");
    answares_main_container.append("<h3>Questions leave blank: <span>" + blanks + "</span></h3>");
    answares_main_container.append('<button id= reload class="btn btn-primary">Play Again</button>');
    $(".result_container").append(answares_main_container);
    $("#reload").on("click", function() {
        location.reload();
    })
}

///Should be an array with the Questions , options , and correct answare, most like a object
/// This part for loop to create the questions 
function start_trivia() {
    /////start the clock////
    start();
    /////creation of the questions 
    for (var i = 0; i < questions.length; i++) {
        var question_count = i;
        var question_label = $("<div>");
        question_label.addClass("question");
        question_label.text(questions[i].quiz);
        question_label.attr('id', question_count);
        $(".question_container").append(question_label);
        ////call the function to create the optional answares
        options(questions[i], question_count);
    }
    $("form").append('<button id="sent" class="btn btn-primary">Submit</button>');
}
//////// Creating the Start Button////////
var start_button = $("<button>");
start_button.addClass("btn btn-default");
start_button.attr("id", "start_button");
start_button.text("PLAY!!!!");
$("#start_button").html(start_button);
//////////////////////////////////////////

//Button created on the beginin , call the function to star the game//////// 
$("#start_button").on("click", function(event) {
    $("#start_end_container").remove();
    //trivia start//
    start_trivia();
    // the submit button is called
    $("#sent").on("click", function(event) {
        event.preventDefault();
        results = $("form").serializeArray();
        evaluate(questions, results);
        display_result(corrects, incorrects, blanks);

    });
});
/////////////////////////////////////

// start_trivia();

//Here the Trivia get started

///This part to receive the answares


///Timer