document.getElementById('project-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const form = this;
    const data = {
      account_id: parseInt(form.account_id.value), // Parse account ID to number
      project_name: form.project_name.value,
      project_started_on: form.project_started_on.value,
      project_end_date: form.project_end_date.value
    };
  
    fetch('/insert_project_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          document.getElementById('message').textContent = 'Failed to insert project: ' + text;
        });
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('message').textContent = data.message || 'Project information inserted successfully!';
      // You can potentially reset the form here: form.reset();
    })
    .catch(error => {
      document.getElementById('message').textContent = 'Failed to insert project: ' + error;
    });
  });
  