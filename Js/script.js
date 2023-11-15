const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Vatican", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Napal", correct: false},
            {text: "Shri Lanka", correct: false}
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true}
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false}
        ]
    }

]

const quesTag = document.querySelector(".ques");
const answerTag = document.querySelector(".answer-btn");
const answerContainerTag = document.querySelector(".answer-btn-Container");
const nextButtonTag = document.querySelector(".nextButton");

let currentQuizIndex;
let score;

function quizStart() {
    currentQuizIndex = 0;
    score = 0;
    nextButtonTag.innerHTML = "Next";
    showQues();
}

function showQues() {
    resetState();
    let currentQues = questions[currentQuizIndex];
    let quesNum = currentQuizIndex + 1;

    quesTag.innerHTML = quesNum + ". " + currentQues.question;
    currentQues.answers.forEach( answer => {
        let button = document.createElement("div");
        button.classList.add("answer-btn");
        button.textContent = answer.text;
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener ("click", buttonSelected)
        answerContainerTag.append(button);
    })

}

function resetState() {
    nextButtonTag.style.display = "none";
    answerContainerTag.innerHTML = "";
    // while(answerContainerTag.firstChild) {
    //     answerContainerTag.removeChild(answerContainerTag.firstChild);
    // }
}


function buttonSelected(e) {
    let selectedBtn = e.target;// return element
    let isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    // Array.from(answerContainerTag.children).forEach(button => {
    //     if (button.dataset.correct === "true") {
    //         button.classList.add("correct");
    //     }
    // })
    for(let i = 0; i < answerContainerTag.children.length; i++) {
        let arrayElement = answerContainerTag.children[i];
        let correctValue = arrayElement.dataset.correct === "true";
        if (correctValue) {
            arrayElement.classList.add("correct");
        }
    }
    nextButtonTag.style.display = "block";
}

function showScore() {
    resetState();
    quesTag.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButtonTag.innerHTML = "Play Again";
    nextButtonTag.style.display = "block";
}

nextButtonTag.addEventListener("click", () => {
    if (currentQuizIndex < questions.length) {
        currentQuizIndex++;
        if (currentQuizIndex < questions.length) {
            showQues();
        }else {
            showScore();
        }
    }else {
        quizStart();
    }

})

quizStart();
