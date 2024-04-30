const uploadForm = document.getElementById("uploadForm");
const questionContainer = document.getElementById("questionContainer");

// Function to create a new question box
function createQuestionBox() {
  const questionElement = document.createElement("div");
  questionElement.className = "questionBox"; // Add class for styling

  const textBox = document.createElement("textarea");
  textBox.className = "readOnlyTextbox"; // Add class for styling
  textBox.setAttribute("readonly", true);

  const btnGrpDiv = document.createElement("div");
  btnGrpDiv.className = "btn-grp";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "btn-edit";
  editButton.addEventListener("click", () => {
    textBox.removeAttribute("readonly");
    textBox.focus();
  });

  const deleteButton = document.createElement("button"); // Create delete button
  deleteButton.textContent = "Delete";
  deleteButton.className = "btn-delete";
  deleteButton.addEventListener("click", () => {
    questionContainer.removeChild(questionElement);
  });

  btnGrpDiv.appendChild(editButton);
  btnGrpDiv.appendChild(deleteButton);

  questionElement.appendChild(textBox);
  questionElement.appendChild(btnGrpDiv); // Append delete button

  return questionElement;
}

// Function to add more questions
function addMoreQuestions() {
  const newQuestionBox = createQuestionBox();
  questionContainer.appendChild(newQuestionBox);
}

// Create "Add More Questions" button
const addMoreQuestionsButton = document.createElement("button");
addMoreQuestionsButton.textContent = "Add More Questions";
addMoreQuestionsButton.id = "addMoreQuestions";
addMoreQuestionsButton.addEventListener("click", addMoreQuestions);

// Append "Add More Questions" button to the container
questionContainer.appendChild(addMoreQuestionsButton);

// Event listener for form submission
uploadForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  const file = document.getElementById("questionFile").files[0];

  const formData = new FormData();
  formData.append("questionFile", file);

  fetch("/upload_questions", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
        return;
      }

      data.questions.forEach((question, index) => {
        const questionElement = createQuestionBox();

        const textBox = questionElement.querySelector("textarea");
        textBox.textContent = question;

        questionContainer.appendChild(questionElement);
      });
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      alert("Error uploading file!");
    });
});
