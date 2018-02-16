$(document).ready(function() {
  var questions = [];
  var corrects = 0;
  var incorrects = 0;
  var unanswered = 0;
  var answered = false;
  var currentAnswer = "";
  var cd;
  var active = true;

  initialize();
  $(".ans").on("click", showTrue);
  $("#again").on("click", initialize);

  //   function answer() { //TODO: Figure out how to make $(this) not lose reference to the button even if i wrap the showTrue function in another function.
  //     answered = true;
  //     showTrue();
  //   }

  function nextQuestion() {
    if (questions.length != 0) {
      countdown();
      active = true;
      var rand = Math.floor(Math.random() * questions.length);
      $("#question").text(questions[rand].question);

      var rand1 = Math.floor(Math.random()*questions[rand].choices.length);
      $("#answer1").text(questions[rand].choices[rand1]);
      questions[rand].choices.splice(rand1,1);

      var rand2 = Math.floor(Math.random()*questions[rand].choices.length);
      $("#answer2").text(questions[rand].choices[rand2]);
      questions[rand].choices.splice(rand2,1);

      var rand3 = Math.floor(Math.random()*questions[rand].choices.length);
      $("#answer3").text(questions[rand].choices[rand3]);
      questions[rand].choices.splice(rand3,1);
      
      var rand4 = Math.floor(Math.random()*questions[rand].choices.length);
      $("#answer4").text(questions[rand].choices[rand4]);
      questions[rand].choices.splice(rand4,1);

      currentAnswer = questions[rand].answer;
      questions.splice(rand, 1);
    } else {
      clearInterval(cd);
      results();
    }
  }

  function showTrue() {
    if (active) {
      active = false;
      clearInterval(cd);
      // if (!answered) {
      //   unanswered++;
      // } else {
      //   answered = false;
      // }
      if ($(this).text() == currentAnswer) {
        $("#question").text("Correct!");
        corrects++;
      } else {
        $("#question").text("Oops! The correct answer is : " + currentAnswer);
      }
      setTimeout(function() {
        nextQuestion();
      }, 1200);
    }
  }

  function countdown() {
    clearInterval(cd);
    $("#time").text("Time:30");  //TODO: Figure out the right way to set the time.
    var x = 29;
    cd = setInterval(function() {
      $("#time").text("Time:" + x);
      x--;
      if (x < 0) {
        unanswered++;
        showTrue();
      }
    }, 950);
  }

  function initialize() {
    clearInterval(cd);
    questions = [
      {
        question: "Which answer is the correct answer?",
        answer: "This one.",
        choices: ["This one.", "That one.", "This.", "This here."]
      },
      {
        question: "Where is the right answer?",
        answer: "Over here.",
        choices: ["There.", "Over here.", "Here.", "Over There."]
      },
      {
        question: "Which of the following is correct?",
        answer: "I am.",
        choices: ["I am.", "I'm not.", "I could be.", "I may be."]
      },
      {
        question: "Do you know the answer?",
        answer: "Yes.",
        choices: ["Is it.", "Yes.", "No", "Maybe So"]
      }
    ];
    corrects = 0;
    incorrects = 0;
    unanswered = 0;
    $("#again").empty();
    nextQuestion();
  }

  function results() {
      active=false;
    $("#answer1").empty();
    $("#answer2").empty();
    $("#answer3").empty();
    $("#answer4").empty();
    $("#question").text("Game over, here are your results:");
    $("#question").append("<p> Corrects: " + corrects + "</p>");
    $("#question").append("<p> Incorrects: " + (4 - corrects - unanswered) + "</p>");
    $("#question").append("<p> Unanswered: " + unanswered + "</p>");
    $("#again").text("Play Again?");
  }
});
