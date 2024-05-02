const uploadForm = document.getElementById("uploadForm");
const questionContainer = document.getElementById("questionContainer");
const submitButton = document.getElementById("submitButton");
const csatIdDisplay = document.getElementById("csat-id-display");
const csatId = csatIdDisplay.textContent.split(": ")[1];
const uploadPopup = document.querySelector(".upload-popup");
const uploadMessage = document.getElementById("uploadMessage");
const closePopupButton = document.querySelector(".close-popup-btn");
const selectedFileNameSpan = document.querySelector(".selected-file-name");

// Function to create a new question box
function createQuestionBox(question) {
  const questionElement = document.createElement("div");
  questionElement.className = "questionBox"; // Add class for styling

  const textBox = document.createElement("textarea");
  textBox.className = "editableTextbox"; // Initially editable
  textBox.textContent = question;

  const btnGrpDiv = document.createElement("div");
  btnGrpDiv.className = "btn-grp";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "btn-edit";
  editButton.addEventListener("click", () => {
    textBox.classList.toggle("editableTextbox");
    textBox.classList.toggle("readOnlyTextbox");
    textBox.focus();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "btn-delete";
  deleteButton.addEventListener("click", () => {
    questionContainer.removeChild(questionElement);
  });

  btnGrpDiv.appendChild(editButton);
  btnGrpDiv.appendChild(deleteButton);

  questionElement.appendChild(textBox);
  questionElement.appendChild(btnGrpDiv);

  return questionElement;
}

// Function to add more questions
function addMoreQuestions() {
  const newQuestionBox = createQuestionBox(""); // Create an empty question box
  questionContainer.appendChild(newQuestionBox);
}

// Create "Add More Questions" button
const addMoreQuestionsButton = document.createElement("button");
addMoreQuestionsButton.textContent = "Add More Questions";
addMoreQuestionsButton.id = "addMoreQuestions";
addMoreQuestionsButton.addEventListener("click", addMoreQuestions);

// Append "Add More Questions" button to the container
questionContainer.appendChild(addMoreQuestionsButton);

// Event listener for form submission (triggered on file selection)
uploadForm.addEventListener("change", (event) => {
  const file = event.target.files[0];

  // Update selected file name display
  if (file) {
    selectedFileNameSpan.textContent = `Selected File: ${file.name}`;
  } else {
    selectedFileNameSpan.textContent = "";
    uploadMessage.textContent = "Please select a file!";
    uploadPopup.classList.add("error");
    uploadPopup.style.display = "block";
    return;
  }

  const formData = new FormData();
  formData.append("questionFile", file);

  fetch("/upload_questions", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        uploadMessage.textContent = data.error;
        uploadPopup.classList.add("error");
        uploadPopup.style.display = "block";
        return;
      }

      uploadMessage.textContent = "Questions uploaded successfully!";
      uploadPopup.classList.add("success");
      uploadPopup.style.display = "block";

      data.questions.forEach((question) => {
        const questionElement = createQuestionBox(question);
        questionContainer.appendChild(questionElement);
      });
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      uploadMessage.textContent = "Error uploading file!";
      uploadPopup.classList.add("error");
      uploadPopup.style.display = "block";
    });
});

// Close popup button functionality
closePopupButton.addEventListener("click", () => {
  uploadPopup.style.display = "none";
});

// Create rating scale within each question box
submitButton.addEventListener("click", () => {
  const questions = Array.from(
    questionContainer.querySelectorAll(".questionBox textarea")
  ).map((textArea) => textArea.value);

  // Redirect to the review page with questions and CSAT ID as query parameters
  const queryParams = new URLSearchParams();
  queryParams.append("questions", JSON.stringify(questions));
  queryParams.append("csatId", csatId);

  const reviewPageUrl = `/review?${queryParams.toString()}`;
  window.location.href = reviewPageUrl;
});
