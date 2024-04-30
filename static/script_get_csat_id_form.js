const form = document.getElementById('csat-id-form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const csatId = document.getElementById('csat_id').value;

  // Redirect with the CSAT ID as a query parameter
  window.location.href = `/upload_questions_page?csat_id=${csatId}`;
});
