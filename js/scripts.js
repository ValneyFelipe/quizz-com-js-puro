// Declaração de variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");

const correntlyQuestion = document.querySelector('#actual-number-questions')

const letters = [ "a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas 

const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript?",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual método é utilizado para adicionar um elemento ao final de um array em JavaScript?",
      "answers": [
        {
          "answer": "push()",
          "correct": true
        },
        {
          "answer": "pop()",
          "correct": false
        },
        {
          "answer": "shift()",
          "correct": false
        },
        {
          "answer": "unshift()",
          "correct": false
        }
      ]
    },
    {
      "question": "Qual é a estrutura de controle de fluxo utilizada para tomar decisões em JavaScript?",
      "answers": [
        {
          "answer": "for",
          "correct": false
        },
        {
          "answer": "if",
          "correct": true
        },
        {
          "answer": "while",
          "correct": false
        },
        {
          "answer": "switch",
          "correct": false
        }
      ]
    },
    {
      "question": "Qual é o tipo de variável para armazenar números inteiros em JavaScript?",
      "answers": [
        {
          "answer": "string",
          "correct": false
        },
        {
          "answer": "boolean",
          "correct": false
        },
        {
          "answer": "int",
          "correct": false
        },
        {
          "answer": "number",
          "correct": true
        }
      ]
    },
    {
      "question": "Qual método é utilizado para adicionar um elemento ao final de um array em JavaScript?",
      "answers": [
        {
          "answer": "push()",
          "correct": true
        },
        {
          "answer": "pop()",
          "correct": false
        },
        {
          "answer": "shift()",
          "correct": false
        },
        {
          "answer": "unshift()",
          "correct": false
        }
      ]
    },
    {
      "question": "Qual é a tag utilizada para criar um link em HTML?",
      "answers": [
        {
          "answer": "<link>",
          "correct": false
        },
        {
          "answer": "<a>",
          "correct": true
        },
        {
          "answer": "<href>",
          "correct": false
        },
        {
          "answer": "<url>",
          "correct": false
        }
      ]
    },
    {
      "question": "Qual elemento HTML é usado para criar uma lista ordenada?",
      "answers": [
        {
          "answer": "<ul>",
          "correct": false
        },
        {
          "answer": "<li>",
          "correct": false
        },
        {
          "answer": "<ol>",
          "correct": true
        },
        {
          "answer": "<dl>",
          "correct": false
        }
      ]
    },
    {
      "question": "Qual é a tag utilizada para inserir uma imagem em uma página HTML?",
      "answers": [
        {
          "answer": "<img>",
          "correct": true
        },
        {
          "answer": "<src>",
          "correct": false
        },
        {
          "answer": "<picture>",
          "correct": false
        },
        {
          "answer": "<link>",
          "correct": false
        }
      ]
    }
]
  

// troca do quizz para a primeira pergunta
function init() {
  // criar a primeira pergunta
  createQuestion(0)
}

// cria uma pergunta
function createQuestion(i) {

  // limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll("button")

  oldButtons.forEach(function(btn) {
    btn.remove()
  })

  // alterar o texto da pergunta
  const questionText = document.querySelector("#question-text")
  const questionNumber = document.querySelector("#question-number")

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  //insere as alternativas
  questions[i].answers.forEach(function(answer, i) {
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

    const lettersBtn = document.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    lettersBtn.textContent = letters[i];
    answerText.textContent = answer['answer']

    answerTemplate.setAttribute("correct-answer", answer["correct"])

    answerTemplate.classList.remove("hide")
    answerTemplate.classList.remove("answer-template")

    //inserir alternativas na tela
    answersBox.appendChild(answerTemplate);

    //inserir evento de click no botao
    answerTemplate.addEventListener('click', function() {
      checkAnswer(this)
    });

  });

  //Incrementar o número da questão
  actualQuestion++;
  correntlyQuestion.textContent = `${actualQuestion}/${questions.length}`
}

function checkAnswer(btn){
  const buttons = answersBox.querySelectorAll("button");

  //verifica se a resposta está correta 
  buttons.forEach(function(button) {
    if(button.getAttribute("correct-answer") == "true"){
      button.classList.add("correct-answer")

      //checar resposta do usuário
      if(btn === button){
        points++;
      }
    }
    else {
      button.classList.add("wrong-answer")
    }
  });

  //exibir próximma perguta
  nextQuestion();

}

//exibir próximma perguta
function nextQuestion(){
  setTimeout(function() {

    //verifica se há mais perguntas
    if(actualQuestion >= questions.length) {
      //mostrar mensagem de sucesso
      showSuccessMessage();
      return;
      
    }

    createQuestion(actualQuestion)
    
  }, 800);
}

//exibi a tela fina

function showSuccessMessage() {

  //
  hideOrShowQuizz();

  // Trocar dado da tela de sucesso

  // calcular sccore
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector("#display-score span");
  displayScore.textContent = score.toString();

  // alterar número da pergunta
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.textContent = points;

  // alterar o total
  const totalQuestions = document.querySelector("#questions-qty");
  totalQuestions.textContent = questions.length;
}

// mostrar ou ocultar quizz
function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");


}

// reiniciar quizz

const restartesBtn = document.querySelector("#restart");

restartesBtn.addEventListener('click', () => {
  // zerar o jogo
  actualQuestion= 0;
  points = 0;
  hideOrShowQuizz();
  init();
});



// inicializa o Quizz
init();