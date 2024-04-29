document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const form = this;
    const data = {
      id: form.id.value,
      user_name: form.user_name.value,
      email: form.email.value,
      user_type: form.user_type.value,
      is_active: form.is_active.value
    };
  
    fetch('/insert_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => {  // Handle successful response
      if (!response.ok) {
        return response.text().then(text => {
          document.getElementById('message').textContent = 'Failed to insert user: ' + text;
        });
      }
      return response.json(); // Parse JSON response data
    })
    .then(data => {  // Process response data (optional)
      document.getElementById('message').textContent = data.message || 'Data inserted successfully!';
      // You can potentially reset the form here: form.reset();
    })
    .catch(error => {  // Handle errors
      document.getElementById('message').textContent = 'Failed to insert user: ' + error;
    });
  });
  