const uploadForm = document.getElementById('uploadForm');
const questionContainer = document.getElementById('questionContainer');

uploadForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const file = document.getElementById('questionFile').files[0];

  const formData = new FormData();
  formData.append('questionFile', file);

  fetch('/upload_questions', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
      return;
    }

    questionContainer.innerHTML = ''; // Clear previous content

    data.questions.forEach(question => {
      const questionElement = document.createElement('div');
      questionElement.textContent = question;
      questionContainer.appendChild(questionElement);
    });
  })
  .catch(error => {
    console.error('Error uploading file:', error);
    alert('Error uploading file!');
  });
});
