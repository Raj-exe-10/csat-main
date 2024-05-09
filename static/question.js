const uploadForm = document.getElementById("uploadForm");
const questionContainer = document.getElementById("questionContainer");
const submitButton = document.getElementById("submitButton");
const csatIdDisplay = document.getElementById("csat-id-display");
const customerIDDisplay = document.getElementById("customer-id-display");
const csatId = csatIdDisplay.textContent.split(": ")[1].trim();
const customerId = customerIDDisplay.textContent.split(": ")[1].trim();
const uploadPopup = document.querySelector(".upload-popup");
const uploadMessage = document.getElementById("uploadMessage");
const closePopupButton = document.querySelector(".close-popup-btn");
const selectedFileNameSpan = document.querySelector(".selected-file-name");

// Function to create a new question box
function createQuestionBox(question = "") {
  const questionElement = document.createElement("div");
  questionElement.className = "question-box"; // Ensure class matches CSS
  const textBox = document.createElement("textarea");
  textBox.className = "question-text";
  textBox.textContent = question;

  const btnGrpDiv = document.createElement("div");
  btnGrpDiv.className = "actions";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit-btn";
  editButton.onclick = function() {
    textBox.readOnly = !textBox.readOnly;
    textBox.focus();
    editButton.textContent = textBox.readOnly ? "Edit" : "Save";
  };

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-btn";
  deleteButton.onclick = function() {
    questionContainer.removeChild(questionElement);
  };

  btnGrpDiv.appendChild(editButton);
  btnGrpDiv.appendChild(deleteButton);

  questionElement.appendChild(textBox);
  questionElement.appendChild(btnGrpDiv);

  return questionElement;
}

// Function to add more questions
function addMoreQuestions() {
  const newQuestionBox = createQuestionBox(); // Create an empty question box
  questionContainer.appendChild(newQuestionBox);
}

document.getElementById("addMoreQuestionsBtn").addEventListener("click", addMoreQuestions);

document.getElementById("uploadForm").addEventListener("change", function(event) {
  const fileInput = document.getElementById("questionFile");
  if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      console.log("File chosen: ", file.name); // Check if this logs when you choose a file

      const formData = new FormData();
      formData.append("questionFile", file);

      console.log("Sending fetch request to server..."); // Check if this executes
      fetch("/upload_questions", {
          method: "POST",
          body: formData,
      })
      .then(response => {
          console.log("Received response from server"); // Check the network response
          return response.json();
      })
      .then(data => {
          if (data.error) {
              console.error("Error: ", data.error); // Log any errors
              uploadMessage.textContent = data.error;
              uploadPopup.classList.add("error");
              uploadPopup.style.display = "block";
          } else {
              uploadMessage.textContent = "Questions uploaded successfully!";
              uploadPopup.classList.remove("error");
              uploadPopup.classList.add("success");
              uploadPopup.style.display = "block";

              // Clear existing questions
              questionContainer.innerHTML = "";

              // Add new questions to the container
              data.questions.forEach(question => {
                  const newQuestionBox = createQuestionBox(question);
                  questionContainer.appendChild(newQuestionBox);
              });
          }
      })
      .catch(error => {
          console.error("Error uploading file:", error); // Log fetch errors
          uploadMessage.textContent = "Error uploading file!";
          uploadPopup.classList.add("error");
          uploadPopup.style.display = "block";
      });
  } else {
      console.log("No file selected"); // Check if this logs when no file is selected
      selectedFileNameSpan.textContent = "No file selected!";
      uploadMessage.textContent = "Please select a file!";
      uploadPopup.classList.add("error");
      uploadPopup.style.display = "block";
  }
});

// Close popup button functionality
closePopupButton.addEventListener("click", () => {
  uploadPopup.style.display = "none";
});

// Submit button functionality
submitButton.addEventListener("click", () => {
  const questions = Array.from(questionContainer.querySelectorAll(".question-text")).map(textArea => textArea.value);
  const queryParams = new URLSearchParams({ csatId, customerId, questions: JSON.stringify(questions) });
  window.location.href = `/review?${queryParams.toString()}`;
});