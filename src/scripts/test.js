// import { client } from "@gradio/client";

// const text =
//   "Pokémon is a Japanese media franchise consisting of video games, animated series and films, a trading card game, and other related media. The franchise takes place in a shared universe in which humans co-exist with creatures known as Pokémon, a large variety of species endowed with special powers. The franchise's target audience is children aged 5 to 12, but is known to attract people all ages.";

// const app = await client("https://vixuan-questgen.hf.space/");
// const result = await app.predict("/predict", [
//   text, // string  in 'Input Text' Textbox component
//   5, // number  in 'Max Questions' Number component
// ]);

// console.log(result.data);
// const response = result.data[0];
// console.log("Statement: ", response.statement);
// response.questions.forEach((question) => {
//   console.log(
//     `Question ${question.id}: `,
//     question.question_statement,
//     "\n",
//     "Answer: ",
//     question.answer,
//     "\n",
//     "Options: ",
//     question.options,
//     "\n \n",
//     `Options Algorithm: ${question.options_algorithm} \n Question Type: ${question.question_type}`,
//     "\n \n",
//     "Context: ",
//     question.context
//   );
// });

import { client } from "@gradio/client";

let timerInterval;

function startTimer() {
  let seconds = 0;
  let milliseconds = 0;
  const timerElement = document.getElementById("timer");

  timerElement.style.display = "block";
  // Update the timer every 100 milliseconds
  timerInterval = setInterval(() => {
    milliseconds += 100;
    if (milliseconds === 1000) {
      milliseconds = 0;
      seconds++;
    }

    // Display the timer in the format "00:00"
    const formattedTime =
      (seconds < 10 ? "0" : "") +
      seconds +
      ":" +
      (milliseconds < 100 ? "0" : "") +
      milliseconds;
    const ETA =
      Math.floor(
        (document.getElementById("context").textContent.split(/\s+/).length /
          39) *
          10
      ) / 10;
    timerElement.textContent = `Time elapsed: ${formattedTime}, ETA: ${ETA}s`;
  }, 100);
}

textrun(
  "Pokémon is a Japanese media franchise consisting of video games, animated series and films, a trading card game, and other related media. The franchise takes place in a shared universe in which humans co-exist with creatures known as Pokémon, a large variety of species endowed with special powers. The franchise's target audience is children aged 5 to 12, but is known to attract people all ages."
);

export default async function textrun(inputText) {
  console.log("Fetching...");
  startTimer();
  const app = await client("https://vixuan-questgen.hf.space/");
  const result = await app.predict("/predict", [
    inputText, // string  in 'Input Text' Textbox component
    5, // number  in 'Max Questions' Number component
  ]);

  clearInterval(timerInterval);

  const parts = document.getElementById("timer").textContent.split(",");
  document.getElementById("timer").textContent = parts[0];
  const jumpToQuestions = document.createElement("button");
  jumpToQuestions.classList =
    "border-2 ml-2 mr-2 px-5 py-[0.25rem] hover:text-primary hover:transition-colors rounded-md";
  jumpToQuestions.innerHTML =
    "<a href='#quiz-container' style='text-decoration: none;'>Jump to Questions</a>";
  document.getElementById("timer").appendChild(jumpToQuestions);

  // if (!result || !result.data || !result.data[0] || !result.data[0].question) {
  //   console.error("Invalid response from the server:", result);
  //   return; // Exit the function gracefully
  // }
  console.log(result.data);
  console.log(result.data[0]);
  const question = result.data[0].questions;
  console.log("Fetched! ", question);
  // Loop to generate questions and buttons
  var quizContainer = document.getElementById("quiz-container");
  question.forEach((question) => {
    var options = [question.answer];
    question.options.forEach((option) => options.push(option.toLowerCase()));

    function shuffleArray(array) {
      array.sort(() => Math.random() - 0.5);
    }

    shuffleArray(options); // Shuffle the options

    var questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<h2>${question.context}</h2><br><br><h2>${question.question_statement}</h2>`;

    options.forEach((option) => {
      var button = document.createElement("button");
      button.textContent = option;
      button.innerHTML += "<br/>";
      button.classList =
        "border-2 mt-4 mb-4 ml-2 mr-2 px-5 py-[0.25rem] hover:text-primary hover:transition-colors rounded-md";
      questionDiv.appendChild(button);

      button.addEventListener("click", () => {
        if (option === question.answer) {
          button.style.color = "green";
          button.style.border = "1rem";
          alert("Correct!");
        } else {
          button.style.color = "red";
          button.style.border = "1rem";
          alert("Incorrect.");
        }
      });
    });
    quizContainer.classList.remove("hidden");
    quizContainer.appendChild(questionDiv);
  });
}
