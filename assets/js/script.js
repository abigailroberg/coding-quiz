// select elements
var body = document.body;
var highScoreBtnEl = document.querySelector("#high-score-btn");
var timeEl = document.querySelector("#time");
var timeTxtEl = document.querySelector("#time-text");
var startBtnEl = document.querySelector("#start-quiz-btn");
var quizEl = document.querySelector("#quiz");

// global variables
var answer;
let timeLeft = 5;
let score = 0;
let currectQ = 0;
var initials = "";
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
var highScores = [
    {
        initials: "TJR",
        score: 0
    },
    {
        initials: "EPB",
        score: 1000
    },
    {
        initials: "AMR",
        score: 20
    }  
    ];
console.log(highScores);

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
    quizEl = document.createElement("div");
    quizEl.className = "quiz end";
    var h1El = document.createElement("h1");
    h1El.textContent = "All done!";
    var pEl = document.createElement("p");
    pEl.textContent = "Your final score is " + timeLeft;
    // add heading and score to the div
    quizEl.appendChild(h1El);
    quizEl.appendChild(pEl);
    // create form input for high scores page
    var formEl = document.createElement("form");
    var labelEl = document.createElement("label");
    labelEl.textContent = "Enter initials: "
    var inputEl = document.createElement("input");
    inputEl.setAttribute("id", "initials");
    var submitBtnEl = document.createElement("button");
    submitBtnEl.className = "question-btn";
    submitBtnEl.textContent = "Submit";
    submitBtnEl.setAttribute("id", "submit");
    // add form elements to the form
    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    formEl.appendChild(submitBtnEl);
    // add form to the div
    quizEl.appendChild(formEl);
    // add div with all elements appended
    body.appendChild(quizEl);
    // record initials entered
    initials = document.querySelector("#initials").value;
    // add event listener to submit button
    submitBtnEl.addEventListener("click", submit);
}

// function to submit your high score
var submit = function() {
    // create obj with new high score
    var obj = {
        initials: initials,
        score: timeLeft
    };
    // add new score to highScores array
    highScores.push(obj);
    // view high scores list
    viewHighScores();
}

// function to view list of high scores
var viewHighScores = function() {
    // sort high scores array
    highScores.sort(function(a,b) {
        return b.score - a.score;
    });
    // remove screen elements
    quizEl.remove();
    highScoreBtnEl.remove();
    timeTxtEl.remove();
    // create high scores div
    var highScoresEl = document.createElement("div");
    highScoresEl.className ="quiz scores";
    // add heading
    var headingEl = document.createElement("h1");
    headingEl.textContent = "High Scores";
    highScoresEl.appendChild(headingEl);
    // add list of scores
    var listEl = document.createElement("ul");
    for (var i = 0; i < highScores.length; i++) {
        var itemEl = document.createElement("li");
        itemEl.textContent = highScores[i].initials + " - " + highScores[i].score;
        listEl.appendChild(itemEl);
    }
    highScoresEl.appendChild(listEl);
    // add buttons
    var backBtnEl = document.createElement("button");
    backBtnEl.textContent = "Go back";
    backBtnEl.className = "question-btn scores-btn";
    backBtnEl.setAttribute("id", "back-btn");
    highScoresEl.appendChild(backBtnEl);
    var clearBtnEl = document.createElement("button");
    clearBtnEl.textContent = "Clear high scores";
    clearBtnEl.className = "question-btn scores-btn"
    highScoresEl.appendChild(clearBtnEl)
    // display div
    body.appendChild(highScoresEl);
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
            timeEl.textContent = "";
            clearInterval(timeInterval);
            end();
        }
    }, 1000);
}

// event listener for click start
startBtnEl.addEventListener("click", start);

// event listener for high scores
highScoreBtnEl.addEventListener("click", viewHighScores);