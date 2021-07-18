// select elements
var body = document.body;
var highScoreBtnEl = document.querySelector("#high-score-btn");
var timeEl = document.querySelector("#time");
var startBtnEl = document.querySelector("#start-quiz-btn");
var quizEl = document.querySelector("#quiz");

// global variables
var answer;
let timeLeft = 60;
let score = 0;
let currectQ = 0;
var questions = [
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

    // start timer
    timer();

    // ask next question
    ask(currectQ);
}

var ask = function(id) {
    // create & add div for new question to body
    quizEl = document.createElement("div");
    quizEl.className = "quiz";
    body.appendChild(quizEl);
    
    // create & add heading with question to div
    var askQuestionEl = document.createElement("h1");
    askQuestionEl.textContent = questions[id].q;
    answer = questions[id].a;
    quizEl.appendChild(askQuestionEl);
    
    // create & add buttons for answer choices to div
        // choice 1
    var c1 = document.createElement("button");
    c1.setAttribute("id", "c1");
    c1.className = "question-btn";
    c1.textContent = questions[id].c1;
    quizEl.appendChild(c1);
    var c1El = document.getElementById("c1");
    c1El.addEventListener("click", recordAnswer);

        // choice 2
    var c2 = document.createElement("button");
    c2.setAttribute("id", "c2");
    c2.className = "question-btn";
    c2.textContent = questions[id].c2;
    quizEl.appendChild(c2);
    var c2El = document.getElementById("c2");
    c2El.addEventListener("click", recordAnswer);

        // choice 3
    var c3 = document.createElement("button");
    c3.setAttribute("id", "c3");
    c3.className = "question-btn";
    c3.textContent = questions[id].c3;
    quizEl.appendChild(c3);
    var c3El = document.getElementById("c3");
    c3El.addEventListener("click", recordAnswer);

        // choice 4
    var c4 = document.createElement("button");
    c4.setAttribute("id", "c4");
    c4.className = "question-btn";
    c4.textContent = questions[id].c4;
    quizEl.appendChild(c4);
    var c4El = document.getElementById("c4");
    c4El.addEventListener("click", recordAnswer);
}

// function to record user response to question
var recordAnswer = function() {
    var answerClicked = event.target.id;
    var answerCheck = document.createElement("p")
    answerCheck.className = "answerCheck"
    if (answerClicked === answer) {
        // provide answer feeedback
        answerCheck.textContent = "Correct!";
    }
    else {
        answerCheck.textContent = "Wrong!";
        timeLeft = timeLeft - 5;
    }
    // display feedback
    quizEl.appendChild(answerCheck);

     // move to next question
     currectQ++;

     // check for new question & break out of function if not
     if (currectQ >= questions.length) {
        setTimeout(function () {
            end();
    }, 750);
    return;
    }

    // remove answered question & ask the next question after .5 seconds
    setTimeout(function () {
            start();
    }, 500);
}

// function for end of game
var end = function() {
    // remove last question
    quizEl.remove();
    // create end screen div
    var endEl = document.createElement("div");
    endEl.className = "quiz end";
    var h1El = document.createElement("h1");
    h1El.textContent = "All done!";
    var pEl = document.createElement("p");
    pEl.textContent = "Your final score is " + timeLeft;
    endEl.appendChild(h1El);
    endEl.appendChild(pEl);
    // create form input for high scores page
    var formEl = document.createElement("form");
    var labelEl = document.createElement("label");
    labelEl.textContent = "Enter initials: "
    var inputEl = document.createElement("input");
    inputEl.setAttribute("id", "initials");
    var btnEl = document.createElement("button");
    btnEl.className = "question-btn";
    btnEl.textContent = "Submit";
    btnEl.setAttribute("id", "submit");
    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    formEl.appendChild(btnEl);
    endEl.appendChild(formEl);
    // add div with all elements appended
    body.appendChild(endEl);
}

// function to keep track of time / score
function timer() {
    // set the on screen clock
    timeEl.textContent = timeLeft;
    var timeInterval = setInterval(function() {
        // take 1 second off if there is time remaining & the quiz is incomplete
        if (timeLeft > 0 && currectQ < questions.length) {
            timeLeft--;
            timeEl.textContent = timeLeft;
        }
        // if time is up or quiz is complete, stop the timer loop & run the end of quiz function
        else if(timeLeft <= 0 || currectQ >= questions.length) {
            timeEl.textContent = 0;
            end();
            clearInterval(timeInterval);
        }
    }, 1000);
}

// view high scores function

// event listener for click start
startBtnEl.addEventListener("click", start);

// event listener for high scores