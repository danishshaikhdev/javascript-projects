const questionElement = document.getElementById('question');
const answerBtns = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const questionNumberDiv = document.getElementById('qnumber');


let currQuestionIndex = 0;
let score = 0;
let questions;


function startQuiz() {
    questionElement.style.color = '#000000';
    currQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    showQuestions();
}


function showQuestions() {
    resetState();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'questions.json', true);

    xhr.onload = function() {
        if(this.status == 200) {
            questions = JSON.parse(this.responseText);
            console.log(questions.length);
            let currentQuestion = questions[currQuestionIndex];
            let questionNumber = currQuestionIndex + 1;
            questionNumberDiv.innerHTML = `${questionNumber} / ${questions.length}`;
            questionElement.innerHTML = questionNumber + '. ' + currentQuestion.question;

            currentQuestion.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerHTML = answer.text;
                button.classList.add('btn');
                answerBtns.appendChild(button);
                if(answer.correct) {
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener('click', selectAns);
            });
        }
    }
    xhr.send();
    
}

function selectAns(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    }
    else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    })

    nextBtn.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `your scored ${score} out of ${questions.length}`;
    score < 5 ? questionElement.style.color = "#c41a00" : questionElement.style.color = "#049e19";
    nextBtn.innerHTML = 'Play Again';
    nextBtn.style.display = 'block';
}

function resetState() {
    nextBtn.style.display = 'none';
    while(answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function showNextQuestion() {
    currQuestionIndex++;
    if(currQuestionIndex < questions.length) {
        showQuestions();
    }
    else {
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if(currQuestionIndex < questions.length) {
        showNextQuestion();
    }
    else {
        startQuiz();
    }
})

startQuiz();