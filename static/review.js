const questionContainer = document.getElementById("questionContainer");
const urlParams = new URLSearchParams(window.location.search);
const questions = JSON.parse(urlParams.get("questions"));
const csatId = urlParams.get("csatId");

questions.forEach((question, index) => {
  const questionElement = document.createElement("div");
  questionElement.className = "questionBox";

  const questionText = document.createElement("div");
  questionText.className = "question";
  questionText.textContent = `Question ${index + 1}: ${question}`;

  const ratingContainer = document.createElement("div");
  ratingContainer.className = "rating";

  for (let i = 5; i >= 1; i--) {
    const ratingInput = document.createElement("input");
    ratingInput.type = "radio";
    ratingInput.name = `rating-${index}`;
    ratingInput.value = i;
    ratingInput.id = `rating-${index}-${i}`;

    const ratingLabel = document.createElement("label");
    ratingLabel.htmlFor = `rating-${index}-${i}`;
    ratingLabel.textContent = "★";

    ratingContainer.appendChild(ratingInput);
    ratingContainer.appendChild(ratingLabel);
  }

  questionElement.appendChild(questionText);
  questionElement.appendChild(ratingContainer);
  questionContainer.appendChild(questionElement);
});