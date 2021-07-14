// 
var body = document.body;
var highScoreBtnEl = document.querySelector("#high-score-btn");
var timeEl = document.querySelector("#time-left");
var startBtnEl = document.querySelector("#start-quiz-btn");
var quizEl = document.querySelector("#quiz");

// global variables
let timeLeft = 60;
let score = 0;
let questions = [
    {
        q: "Inside which HTML element do we put the JavaScript?",
        c1: "<script>",
        c2: "<javascript>",
        c3: "<js>",
        c4: "<scripting>",
        a: "c1"
    },
    {
        q: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        c1: "<script name ='xxx.js'>",
        c2: "<script href ='xxx.js'>",
        c3: "<script src ='xxx.js'>",
        c4: "<script ref ='xxx.js'>",
        a: "c3"
    },
    {
        q: "How do you write 'Hello World' in an alert box?",
        c1: "alert('Hello World')",
        c2: "msg('Hello World')",
        c3: "msgBox('Hello World')",
        c4: "alertBox('Hello World')",
        a: "c1"
    },
]

// start function
var start = function() {
    // remove starting info div
    quizEl.remove();
    // ask new question
    ask();
}

// ask new question function
var ask = function() {
    // loop through available questions
    for (var i=0; i < questions.length; i++) {
        // create & add div for new question to body
        var questionEl = document.createElement("div");
        questionEl.className = "quiz";
        body.appendChild(questionEl);
        // create & add heading with question to div
        var askQuestionEl = document.createElement("h1");
        askQuestionEl.textContent = questions[i].q;
        questionEl.appendChild(askQuestionEl);
        // create & add buttons for answer choices to div
        var c1 = document.createElement("button");
        c1.className = "question-btn";
        console.log(questions[i].c1);
        c1.textContent = questions[i].c1;
        questionEl.appendChild(c1);
        var c2 = document.createElement("button");
        c2.className = "question-btn";
        c2.textContent = questions[i].c2;
        questionEl.appendChild(c2);
        var c3 = document.createElement("button");
        c3.className = "question-btn";
        c3.textContent = questions[i].c3;
        questionEl.appendChild(c3);
        var c4 = document.createElement("button");
        c4.className = "question-btn";
        c4.textContent = questions[i].c4;
        questionEl.appendChild(c4);
    }
}


// view high scores function

// event listener for click start
startBtnEl.addEventListener("click",start);

// event listener for answer selection
// event listener for high scores