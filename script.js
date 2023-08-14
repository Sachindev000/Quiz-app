const questions = [
    {
        question:
            "Which of the following is not a primitive data type in JavaScript?",
        answers: [
            { text: "Number", correct: false },
            { text: "String", correct: false },
            { text: "Boolean", correct: false },
            { text: "Object", correct: true },
        ],
    },
    {
        question: "What does the “typeof” operator do in JavaScript?",
        answers: [
            { text: "Returns the data type of a variable", correct: true },
            { text: " Checks if a variable is defined", correct: false },
            { text: "Assigns a value to a variable", correct: false },
            { text: "Concatenates two strings", correct: false },
        ],
    },
    {
        question: "What is the output of the following code:",
        answers: [
            { text: "“4”", correct: false },
            { text: "“22”", correct: false },
            { text: "4", correct: false },
            { text: " 22", correct: true },
        ],
    },
    {
        question: "What does the “NaN” value represent in JavaScript?",
        answers: [
            { text: "Not a number", correct: true },
            { text: " Null value", correct: false },
            { text: "Undefined value", correct: false },
            { text: "Boolean value", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
const timer = document.querySelector(".timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerId = null;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    timeLeft = 15;
    timer.style.display = "flex";
    showQuestion();
    startTimer();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} Out Of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    stopTimer();
    timer.style.display = "none";
}

const startTimer = () => {
    clearInterval(timerId);
    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            const confirmUser = confirm(
                "Time Up!!! Do You Want To PLay The Quiz Again?"
            );
            if (confirmUser) {
                timeLeft = 15;
                startQuiz();
            }
        }
    };
    timerId = setInterval(countDown, 1000);
};

const stopTimer = () => {
    clearInterval(timerId);
};

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
    timeLeft = 15;
});

startQuiz();
