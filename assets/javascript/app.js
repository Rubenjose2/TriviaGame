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
    }
];


var correct = 0;
var incorrect = 0;
var answares = [];
var html_pre_question = '<input type = "radio" name ="';
console.log(questions.length);
console.log(questions);

////Functions
function options(questions, num_question) {
    answares = questions.options;
    for (var j = 0; j < answares.length; j++) {
        $(html_pre_question + num_question + '" ' + "value =" +
            answares[j] + ">" + answares[j] + "</input>").insertAfter("#" + num_question);

    }
    // return answares;
}

// console.log(answares);
///Should be an array with the Questions , options , and correct answare, most like a object


/// This part for loop to create the questions 
for (var i = 0; i < questions.length; i++) {
    $(".question_container").append('<div id="' + i + '" >' + questions[i].quiz + "</div>");
    options(questions[i], i);

}
// options(questions[0], 0);

///This part to receive the answares


///Timer