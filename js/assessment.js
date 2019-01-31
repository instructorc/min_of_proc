(function() {
    //these are the quiz questions
    const quizQuestions = [
      {
        question: "How long can turtles live?",
        answers: {
          a: "10 years",
          b: "100 years",
          c: "500 years",
          d: "Turtles are immortal beings, untouched by time"
        },
        correctAnswer: "b"
      },
      {
        question: "Turtles are",
        answers: {
          a: "Cold Blooded",
          b: "Warm Blooded",
          c: "Hot Blooded"
        },
        correctAnswer: "a"
      },
      {
        question: "Male tortises will fight each other until",
        answers: {
          a: "One dies",
          b: "One flips over",
          c: "The bell rings",
          d: "They survey the damage of the battle, and see all they love lies in ruin."
        },
        correctAnswer: "b"
      },
      {
        question: "What is the force of a Blastois's Hydro Pump?",
        answers: {
          a: "100 Newtons",
          b: "500 Newtons",
          c: "1.7 Mega Newtons"
        },
        correctAnswer: "c"
      },
      {
        question: "What does the world turtle stand on?",
        answers: {
          a: "An elephant",
          b: "Another Turtle",
          c: "Nothing, He floats helplessly through the yawning blackness of the void"
        },
        correctAnswer: "b"
      },
    ];
    //This creates the quiz from the questions
    function makeQuiz() {
      const output = [];
      quizQuestions.forEach((currentQuestion, questionNumber) => {
        // answers go in here
        const answers = [];
        for (letter in currentQuestion.answers) {
          // create a button for each answer
          answers.push(
            `<label>
               <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
             </label>`
          );
        }
  
        // question and answer to output
        output.push(
          `<div class="slide">
             <div class="question"> ${currentQuestion.question} </div>
             <div class="answers"> ${answers.join("")} </div>
           </div>`
        );
      });
  
      // add output to html
      quizContainer.innerHTML = output.join("");
    }
  
    function displayResults() {
      // gather answer containers from quiz
      const answerContainers = quizContainer.querySelectorAll(".answers");
  
      let numCorrect = 0;
  
      // collect submitted answer
      quizQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // count correct answers
        if (userAnswer === currentQuestion.correctAnswer) {
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = "lightgreen";
        } else {
          // if the answer isn't right, color red
          answerContainers[questionNumber].style.color = "red";
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length}`;
    }
    //displays the current question, and appropriate buttons
    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;
      
      if (currentSlide === 0) {
        previousButton.style.display = "none";
      } else {
        previousButton.style.display = "inline-block";
      }
      
      if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
      }
    }
    //advances to next question
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
    //goes back to previous question
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
  
    // display quiz
    makeQuiz();
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(0);
  
    // on submit, show results
    submitButton.addEventListener("click", displayResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();