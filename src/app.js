const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector ('.question-text');
const optionContainer = document.querySelector ('.option-container');

let questionCounter= 0; 
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];


function setAvailableQuestions (){
 const totalQuestion = quiz.length;
 quiz.forEach(quiz => availableQuestions.push(quiz))
}

function getNewQuestion(){
 //  set question number
 questionNumber.innerHTML = `Question ${questionCounter + 1} of ${quiz.length}`
  // set random question
  const index = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]; 
  currentQuestion = index;
  questionText.innerHTML = currentQuestion.question;
  //get position index of current question from questions array
  const index1 = availableQuestions.indexOf(index);
  //  remove the question index from the question array so the question does not repeat
 availableQuestions.splice(index1,1);

  //  set options
 // get length of options 
 const optionLength = currentQuestion.options.length;
  const currentOptions = currentQuestion.options
  currentOptions.forEach(option => availableOptions.push(option));  

 // create options in HTML
  availableOptions.forEach(option => {  
    const options = `<div class="option">${option}</div>
    <div class="option">${option}</div>
    <div class="option">${option}</div>
    <div class="option">${option}</div>` 
    optionContainer.innerHTML= options    
  });  
  questionCounter ++   
};

function next(){
 questionCounter  === quiz.length ? console.log('Over'): getNewQuestion(); 
}

window.onload = function (){
//  set all questions in an array
  setAvailableQuestions();
  // set question number
  getNewQuestion();
  next();
}