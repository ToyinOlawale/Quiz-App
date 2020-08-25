const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector ('.question-text');
const optionContainer = document.querySelector ('.option-container');
const answerIndicatorContainer = document.querySelector('.answers-indicator')
const homeBox = document.querySelector('.home-box');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');

let questionCounter= 0; 
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempts= 0;


function setAvailableQuestions (){
 const totalQuestion = quiz.length;
 for(let i=0;i<totalQuestion; i++) {
   availableQuestions.push(quiz[i])
 }
};

function getNewQuestion(){
 //set question number
 questionNumber.innerHTML = `Question ${questionCounter + 1} of ${quiz.length}`
 //set random question
 const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]; 
 currentQuestion = questionIndex ;
 questionText.innerHTML = currentQuestion .question;
 //get position index of current question from questions array
 const index1 = availableQuestions.indexOf(questionIndex);
 //  remove the question index from the question array so the question does not repeat
 availableQuestions.splice(index1,1);

 //set options
 // get length of options  
   const optionLength = currentQuestion.options.length;
   for(let i=0; i< optionLength; i++) {
      availableOptions.push(i)
    }
    optionContainer.innerHTML=''; //to correct the doubling options mistake
    let animationDelay = 0.15;
     //create random options in HTML 
    for(let i=0; i< optionLength; i++) {
      const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length )];
      const index2 = availableOptions.indexOf (optionIndex);         
      availableOptions.splice(index2,1); 
      const option = document.createElement('div');
      option.innerHTML= currentQuestion.options[optionIndex];
      option.id = optionIndex;
      // next 2 lines for animation delay of options
      option.style.animationDelay = animationDelay + 's';
      animationDelay = animationDelay + 0.15 ;
      option.className= "option";
      optionContainer.appendChild(option) 
      option.setAttribute("onclick", "getResult(this)")      
    };
 questionCounter++   
};

//to get result of current attempt question
function getResult (optionElement) {
  const id = parseInt(optionElement.id); //to convert string from div element to number 
  if (id === currentQuestion.answer){
    // set green color to correct option
    optionElement.classList.add ('correct');
    // add indicaor to correct option 
    updateAnswerIndicator('correct');    
    correctAnswers++;
  } else {
    optionElement.classList.add ('wrong');
     // add indicaor to wrong option 
    updateAnswerIndicator('wrong');   
    // if answer is wrong after clicking then show the correct answer by adding green color
    const optionLength = optionContainer.children.length;
    for(let i=0; i< optionLength; i++) {
       if (parseInt(optionContainer.children[i].id) === currentQuestion.answer){
        optionContainer.children[i].classList.add('correct')
       }
    }

  };
  attempts++;

  unclickableOptions ();  
};

// to make all the options unclickable once the user selects an option
function unclickableOptions(){
 const optionLength = optionContainer.children.length;
 for (let i=0; i<optionLength; i++){
   optionContainer.children[i].classList.add("already-answered");
 }
};

function answerIndicator(){
  answerIndicatorContainer.innerHTML='';
  const totalQuestion = quiz.length;
  for(let i= 0; i< totalQuestion; i++){
    const indicator = document.createElement('div');
    answerIndicatorContainer.appendChild(indicator);  
  }
};

function updateAnswerIndicator(markType) {
  answerIndicatorContainer.children[questionCounter-1].classList.add(markType) 
};


function next(){  
  questionCounter == quiz.length   ? quizOver(): getNewQuestion(); 
};

function quizOver(){
  //hide quix box
  quizBox.classList.add('hide');
  //show result box
  resultBox.classList.remove('hide');
  quizResult();
}

function quizResult(){
  resultBox.querySelector('.total-question').innerHTML = quiz.length;
  resultBox.querySelector('.total-attempt').innerHTML = attempts;
  resultBox.querySelector('.total-correct').innerHTML = correctAnswers;
  resultBox.querySelector('.total-wrong').innerHTML = attempts - correctAnswers;
  const percentage = (correctAnswers/quiz.length)*100;
  resultBox.querySelector('.percentage').innerHTML = percentage.toFixed(0) + '%';
  resultBox.querySelector('.total-score').innerHTML = correctAnswers + '/' + quiz.length;
  const message = document.getElementById('message');
  if (percentage <= 40){
    message.innerHTML= 'Nice try..Please you need to get familiar!'
  } else if (percentage > 40 && percentage <= 70) {
    message.innerHTML= "Kudos! You know me to a large extent❤"
  } else {
    message.innerHTML= 'You definately belong in my inner circle. Cheers to greatness🥂'
  };
}

function resetQuiz(){
  questionCounter=0;
  correctAnswers=0;
  attempts=0;
}

function tryAgainQuiz(){
   //hide the resultbox
   resultBox.classList.add('hide');
   //show quiz box
   quizBox.classList.remove('hide');
   resetQuiz();  
   startQuiz();
}


 function backHome(){
  //hide the resultbox
  resultBox.classList.add('hide');
  //show quiz box
  homeBox.classList.remove('hide');
 }

function startQuiz(){

  //hide home box
   homeBox.classList.add('hide');
   //show quiz box
   quizBox.classList.remove('hide');
   
//  set all questions in an array
  setAvailableQuestions();
  // set question number
  getNewQuestion();
  next();
  answerIndicator();
 }


 window.onload = function(){
   homeBox.querySelector('.total-question').innerHTML = quiz.length; 
 }