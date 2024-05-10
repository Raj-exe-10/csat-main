document.addEventListener('DOMContentLoaded', function () {
    const questionContainer = document.getElementById("questionContainer");
    const sendButton = document.getElementById("sendButton");

    // Function to fetch questions from the server
    async function fetchQuestions() {
        try {
            const response = await fetch(`/fetch_csat_id_questions/${csatId}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch questions: status ${response.status}`);
            }
            const data = await response.json();
            displayQuestions(data.questions);
        } catch (error) {
            console.error('Error fetching questions:', error);
            alert("Failed to load questions. Please refresh the page.");
        }
    }

    // Function to display questions with corresponding rating stars
    function displayQuestions(questions) {
        questions.forEach((question, index) => {
          const questionElement = document.createElement("div");
          questionElement.className = "question-box";
          const questionText = document.createElement("div");
          questionText.className = "question";
          questionText.textContent = `Question ${index + 1}: ${question.questions}`;
          const ratingContainer = document.createElement("div");
          ratingContainer.className = "rating";
          // Create radio buttons for each rating option
          for (let i = 5; i >= 1; i--) { // Reversed loop
            const ratingInput = document.createElement("input");
            ratingInput.type = "radio";
            ratingInput.name = `rating-${question.question_id}`;
            ratingInput.value = i; // Value from 5 to 1 representing star count
            ratingInput.id = `rating-${question.question_id}-${i}`;
            const ratingLabel = document.createElement("label");
            ratingLabel.htmlFor = `rating-${question.question_id}-${i}`;
            ratingLabel.textContent = "★"; // Star symbol for visual representation
            ratingContainer.appendChild(ratingLabel); // Append label first
            ratingContainer.appendChild(ratingInput); // Then append input
          }
          questionElement.appendChild(questionText);
          questionElement.appendChild(ratingContainer);
          questionContainer.appendChild(questionElement);
        });
      }
    // Event listener for the submit button
    sendButton.addEventListener("click", async function () {
        // Collect all selected ratings
        const ratings = questionContainer.querySelectorAll('input[type="radio"]:checked');
        const ratingsData = Array.from(ratings).map(rating => ({
            csat_request_id: csatId,
            csat_question_id: rating.name.split('-')[1],
            csat_rating: rating.value
        }));

        // Send ratings data to the server
        try {
            const response = await fetch('/insert_csat_rating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ratings: ratingsData })
            });

            if (!response.ok) {
                throw new Error(`API call failed with status ${response.status}`);
            }

            const data = await response.json();
            if (data.message) {
                console.log(data.message);
                alert("Thank you for your feedback!");
                window.location.href = '/logout';
            } else {
                throw new Error("Unexpected response from API");
            }
        } catch (error) { 
            console.error('Failed to insert CSAT rating:', error);
            alert("An error occurred. Please try again later.");
        }
    });

    fetchQuestions();
});
