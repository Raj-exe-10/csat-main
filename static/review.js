document.addEventListener('DOMContentLoaded', function () {
    const questionContainer = document.getElementById("questionContainer");
    const urlParams = new URLSearchParams(window.location.search);
  
    // Decode the 'questions' URL parameter and parse it as JSON
    const questions = JSON.parse(decodeURIComponent(urlParams.get("questions"))); 
  
    const csatId = urlParams.get("csatId");
    const customerId = urlParams.get("customerId");
    const sendButton = document.getElementById("sendButton");
  
    if (questions && questions.length) {
        questions.forEach((question, index) => {
            const questionElement = document.createElement("div");
            questionElement.className = "questionBox";

            const questionText = document.createElement("div");
            questionText.className = "question";
            questionText.textContent = `Question ${index + 1}: ${question}`;

            const ratingContainer = document.createElement("div");
            ratingContainer.className = "rating";

            for (let i = 1; i <= 5; i++) {
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
    } else {
        // Handle cases where no questions are provided or there is an error in parsing
        console.error("No questions available or error in parsing questions.");
    }

    sendButton.addEventListener("click", () => {
        const ratings = document.querySelectorAll('[type="radio"]:checked');
        let ratingsData = Array.from(ratings).map(r => ({
            questionId: r.name.split('-')[1],
            rating: r.value
        }));

        fetch('/send_review_link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                csat_id: csatId,
                questions: questions, // Send the questions as they are parsed
                customer_id: customerId,
            })
        }).then(response => response.json())
          .then(data => {
              console.log(data.message); // Handle response here
              alert(data.message); // Optionally display a success message
          }).catch(error => {
              console.error('Failed to send data:', error);
              alert('Failed to send data: ' + error); // Optionally display an error message
          });
    });
});
