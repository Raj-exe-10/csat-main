const questionContainer = document.getElementById('questionContainer');
const backButton = document.getElementById('backButton');
const confirmButton = document.getElementById('confirmButton');
const confirmationModal = document.getElementById('confirmationModal');
const submitYes = document.getElementById('submitYes');
const submitNo = document.getElementById('submitNo');

let questions = []; // Array to store questions and ratings

// Function to display questions and rating scale
function displayQuestions(data) {
  questions = data; // Store questions data

  questionContainer.innerHTML = ''; // Clear previous content

  for (const question of questions) {
    const questionBox = document.createElement('div');
    questionBox.classList.add('questionBox');

    const questionText = document.createElement('p');
    questionText.classList.add('question');
    questionText.textContent = question.text;

    const ratingScale = document.createElement('div');
    ratingScale.classList.add('rating-scale');

    for (let i = 1; i <= 5; i++) {
      const ratingStar = document.createElement('span');
      ratingStar.classList.add('rating-star');
      ratingStar.dataset.rating = i;

      if (question.rating && question.rating === i) {
        ratingStar.classList.add('active');
      }

      ratingStar.addEventListener('click', () => {
        question.rating = i; // Update rating for the question
        updateRatingDisplay(questionBox, question.rating);
      });

      ratingScale.appendChild(ratingStar);
    }

    questionBox.appendChild(questionText);
    questionBox.appendChild(ratingScale);

    questionContainer.appendChild(questionBox);
  }
}

// Function to update the rating display based on the selected rating
function updateRatingDisplay(questionBox, rating) {
  const ratingStars = questionBox.querySelectorAll('.rating-star');
  for (const star of ratingStars) {
    star.classList.remove('active');
  }

  for (let i = 1; i <= rating; i++) {
    questionBox.querySelector(`.rating-star[data-rating="${i}"]`).classList.add('active');
  }
}

// Back button functionality
backButton.addEventListener('click', () => {
  // Handle back button action (e.g., redirect to edit page)
});

// Confirm button functionality
confirmButton.addEventListener('click', () => {
  confirmationModal.style.display = 'block';
});

// Submit functionality with confirmation pop-up
submitYes.addEventListener('click', () => {
  // Submit the ratings data (e.g., using AJAX request)
  confirmationModal.style.display = 'none';
});

submitNo.addEventListener('click', () => {
  confirmationModal.style.display = 'none';
});

// Close confirmation modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === confirmationModal) {
    confirmationModal.style.display = 'none';
  }
});
