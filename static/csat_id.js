document.addEventListener('DOMContentLoaded', function() {
  const accountSelect = document.getElementById('account-select');

  fetch('/get_accounts')
      .then(response => response.json())
      .then(data => {
          if (data.error) {
              alert('Failed to load accounts: ' + data.error);
          } else {
              data.accounts.forEach(account => {
                  const option = new Option(account[1], account[0]);
                  accountSelect.appendChild(option);
              });
          }
      })
      .catch(error => {
          console.error('Error loading accounts:', error);
          alert('Error loading accounts: ' + error.message);
      });

  accountSelect.addEventListener('change', function() {
      const accountId = this.value;
      const projectSelect = document.getElementById('project-select');
      const loadingIndicator = document.querySelector('.loading-indicator');

      if (!accountId) {
          projectSelect.disabled = true;
          return;
      }

      projectSelect.innerHTML = ''; // Clear previous options
      loadingIndicator.classList.remove('hidden');

      fetch(`/get_projects_by_account_id/${accountId}`)
          .then(response => response.json())
          .then(data => {
              if (data.error) {
                  alert('Failed to load projects: ' + data.error);
                  projectSelect.disabled = true;
              } else {
                  projectSelect.append(new Option('-- Select Project (Optional) --', ''));
                  data.projects.forEach(project => {
                      const option = new Option(project[1], project[0]);
                      projectSelect.append(option);
                  });
                  projectSelect.disabled = false;
              }
          })
          .catch(error => {
              console.error('Error fetching projects:', error);
              alert('Error fetching projects: ' + error.message);
          })
          .finally(() => {
              loadingIndicator.classList.add('hidden');
              document.querySelector('.project-selection').classList.remove('hidden');
          });
  });

  document.getElementById('csat-id-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      const csatId = document.getElementById('csat-id').value;
      const customerId = document.getElementById('customer-id').value;

      if (!csatId || !customerId) {
          alert('Please enter both CSAT ID and Customer ID.');
          return;
      }

      const url = `/upload_questions_page?csat_id=${encodeURIComponent(csatId)}&customer_id=${encodeURIComponent(customerId)}`;
      window.location.href = url; // Redirect to the questions page with parameters
  });
});
