document.addEventListener('DOMContentLoaded', function () {
    const questionContainer = document.getElementById("questionContainer");
    const urlParams = new URLSearchParams(window.location.search);
    const questions = JSON.parse(decodeURIComponent(urlParams.get("questions")));
    const csatId = urlParams.get("csatId");
    const customerId = urlParams.get("customerId");
    const sendButton = document.getElementById("sendButton");

    // Display questions with radio buttons for ratings
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
        console.error("No questions available or error in parsing questions.");
    }

    sendButton.addEventListener("click", () => {
        insertQuestionsAndSendLink();
    });

    function insertQuestionsAndSendLink() {
        questions.forEach(question => {
            fetch('/insert_csat_question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    csat_request_id: csatId,
                    questions: JSON.stringify([question])
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Question inserted:', data.message);
                // Send csat_id and customer_id after all questions are inserted
                if (question === questions[questions.length - 1]) {
                    sendLink();
                }
            })
            .catch(error => {
                console.error('Error inserting question:', error);
            });
        });
    }

    function sendLink() {
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
                customer_id: customerId,
            })
        }).then(response => response.json())
          .then(data => {
              console.log(data.message);
              alert(data.message);
          }).catch(error => {
              console.error('Failed to send csat_id and customer_id:', error);
              alert('Failed to send data: ' + error);
          });
    }
});
